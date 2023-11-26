const assignmentModel = require("../models/Assignment");
const bcrypt = require("bcrypt");
const { statdClient } = require("../../config/statsd");
const { sendNotification } = require("../utils/sendSNSNotification");
const { logger } = require("../../config/logger");
const account = require("../models/Account");

async function assignmentSubmissionHandler(req, res) {
  console.log(req.body.submission_url)
  sendNotification(req.body.submission_url)
  res.status(201).end();
}

async function assignmentsHandler(req, res) {
  logger.info("assignments handler");
  return res.status(404).end();
}

async function patchHandler(req, res) {
  statdClient.increment('webapp.assignment.patch.total');
  logger.warn("patch not allowed");
  return res.status(405).end();
}

async function getHandler(req, res) {
  statdClient.increment('webapp.assignment.get.total');
  logger.info("assignments get handler");
  if (Object.keys(req.body).length != 0) {
    return res.status(400).end();
  } else {
    await genericRequestHandler(req, res);
  }
}
async function putHandler(req, res) {
  logger.info("assignments put handler");
  await genericRequestHandler(req, res);
}
async function postHandler(req, res) {
  logger.info("assignments post handler");
  await genericRequestHandler(req, res);
}

async function deleteHandler(req, res) {
  logger.info("assignments delete handler");
  if (Object.keys(req.body).length != 0) {
    return res.status(400).end();
  } else {
    await genericRequestHandler(req, res);
  }
}

async function methodDistributor(req, res, accountID) {
  if (req.method == "GET" && !req.params.id) {
    await getAllDataHandler(req, res, accountID);
  }
  if (req.method == "GET" && req.params.id) {
    await getDataHandler(req, res, accountID);
  }
  if (req.method == "POST") {
    isUrlAssignmentSubmission = (req.path === ("/" +req.params.id + '/submission'))
    if(isUrlAssignmentSubmission){
      assignmentSubmissionHandler(req, res)
    } else{
      await insertHandler(req, res, accountID);
    }
  }
  if (req.method == "PUT") {
    await updateHandler(req, res, accountID);
  }
  if (req.method == "DELETE") {
    await deletionHandler(req, res, accountID);
  }
}

async function genericRequestHandler(req, res) {
  if (Object.keys(req.query).length > 0) {
    logger.warn("Query Parameters not allowed");
    return res.status(400).end();
  }
  if (!req.headers.authorization) {
    logger.warn("Authorisation headers required");
    return res.status(401).end();
  } else {
    const authHeader = req.headers.authorization.split(" ")[1];
    const auth = Buffer.from(authHeader, "base64").toString().split(":");
    user = auth[0];
    pass = auth[1];
    try {
      const accountDetails = await account.findOne({
        where: {
          email: user,
        },
      });

      if (accountDetails) {
        const pwMatch = await bcrypt.compare(pass, accountDetails.password);
        if (pwMatch) {
          await methodDistributor(req, res, accountDetails.id);
        } else {
          logger.warn("Invalid Credentials");
          return res.status(401).end();
        }
      } else {
        logger.warn("User not found");
        return res.status(400).end();
      }
    } catch (error) {
      logger.error(error)
      return res.status(500).end();
    }
  }
}

async function getAllDataHandler(req, res, accountId) {
  allData = await assignmentModel.findAll();
  if (allData.length > 0) {
    statdClient.increment('webapp.assignment.get.success');
    logger.info("Fetching all the assignments")
    return res.status(200).json(allData);
  } else {
    logger.info("No data in assignments")
    return res.status(204).end();
  }
}

async function getDataHandler(req, res, accountId) {
  statdClient.increment('webapp.assignment.getOne.total');
  const assignmentId = req.params.id;
  try {
    existingAssignment = await assignmentModel.findOne({
      where: {
        id: assignmentId,
      },
    });

    if (existingAssignment) {
      statdClient.increment('webapp.assignment.getOne.success');
      logger.info("get individual Assignment");
      return res.status(200).json(existingAssignment);
    } else {
      logger.info("Individual Assignment not found");
      return res.status(404).end();
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).end();
  }
}

async function insertHandler(req, res, accountId) {
  statdClient.increment('webapp.assignment.insert.total');
  const requiredKeys = [
    "name",
    "points",
    "num_of_attempts",
    "deadline",
    "account_id",
  ];
  const missingKeys = [];

  accountData = req.body;
  accountData.account_id = accountId;

  if(typeof req.body.name !== 'string'){
    logger.warn("Name should be of type string");
    return res.status(400).end();
  }
  requiredKeys.forEach((key) => {
    if (!(key in accountData)) {
      missingKeys.push(key);
    }
  });

  for (const key in req.body) {
    if (!requiredKeys.includes(key)) {
      logger.warn("Missing required keys");
      return res.status(400).end();
    }
  }

  if (missingKeys.length > 0) {
    return res.status(400).end();
  }

  if (accountData.assignment_created || accountData.assignment_updated) {
    return res.status(400).end();
  } else {
    try {
      postRes = await assignmentModel.create(accountData);
      statdClient.increment('webapp.assignment.insert.success');
      logger.info("Successfully created assignment");
      return res.status(201).json(postRes);
    } catch (error) {
      logger.error(error);
      return res.status(500).end();
    }
  }
}

async function updateHandler(req, res, accountId) {
  statdClient.increment('webapp.assignment.update.total');
  const requiredKeys = [
    "name",
    "points",
    "num_of_attempts",
    "deadline",
    "account_id",
  ];

  if(typeof req.body.name !== 'string'){
    logger.warn("Name should be of type string");
    return res.status(400).end();
  }

  if (
    typeof req.body === "undefined" ||
    req.body.assignment_created ||
    req.body.assignment_updated ||
    Object.keys(req.body).length === 0 ||
    !req.params.id
  ) {
    return res.status(400).end();
  }
  const assignmentId = req.params.id;
  const updateFields = req.body;

  for (const key in req.body) {
    if (!requiredKeys.includes(key)) {
      logger.warn("Missing required keys");
      return res.status(400).end();
    }
  }

  try {
    existingAssignment = await assignmentModel.findOne({
      where: {
        id: assignmentId,
      },
    });

    if (existingAssignment) {
      if (existingAssignment.account_id === accountId) {
        const [updatedRowsCount] = await assignmentModel.update(
          updateFields,
          {
            where: {
              id: assignmentId,
            },
          }
        );

        if (updatedRowsCount > 0) {
          statdClient.increment('webapp.assignment.update.success');
          logger.info("Successfully updat eassignments");
          return res.status(204).end();
        } else {
          return res.status(400).end();
        }
      } else {
        logger.warn("User not authorized to update the assignment")
        return res.status(403).end();
      }
    } else {
      logger.warn("assignment not found")
      return res.status(404).end();
    }
  } catch (error) {
    logger.error(error)
    return res.status(500).end();
  }
}

async function deletionHandler(req, res, accountId) {
  statdClient.increment('webapp.assignment.delete.total');
  if (
    (req.body && Object.keys(req.body).length > 0) ||
    Object.keys(req.params).length === 0
  ) {
    return res.status(400).end();
  }
  const assignmentId = req.params.id;

  try {
    try {
      existingAssignment = await assignmentModel.findOne({
        where: {
          id: assignmentId,
        },
      });

      if (existingAssignment) {
        if (existingAssignment.account_id === accountId) {
          await assignmentModel.destroy({
            where: {
              id: assignmentId,
            },
          });
          statdClient.increment('webapp.assignment.delete.success');
          logger.info("Successfully delete assignment");
          return res.status(204).end();
        } else {
          logger.warn("User not authorized to delete the assignment");
          res.status(403).end();
        }
      } else {
        logger.warn("Assignment not found");
        res.status(404).end();
      }
    } catch (error) {
      logger.error(error);
      res.status(500).end();
    }
  } catch (error) {
    logger.error(error);
    res.status(500).end();
  }
}

module.exports = {
  assignmentsHandler: assignmentsHandler,
  getHandler: getHandler,
  putHandler: putHandler,
  postHandler: postHandler,
  deleteHandler: deleteHandler,
  patchHandler: patchHandler,
  assignmentSubmissionHandler: assignmentSubmissionHandler,
};
