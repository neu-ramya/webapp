const assignmentModel = require("../models/assignment");
const bcrypt = require("bcrypt");
const account = require("../models/Account");

async function assignmentsHandler(req, res) {
  console.log("assignments handler");
  return res.status(404).end();
}

async function getHandler(req, res) {
  console.log("assignments get handler");
  if (req.body) {
    return res.status(400).end();
  } else {
    await genericRequestHandler(req, res);
  }
}
async function putHandler(req, res) {
  console.log("assignments put handler");
  await genericRequestHandler(req, res);
}
async function postHandler(req, res) {
  console.log("assignments post handler");
  await genericRequestHandler(req, res);
}

async function deleteHandler(req, res) {
  console.log("assignments delete handler");
  if (req.body) {
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
    await insertHandler(req, res, accountID);
  }
  if (req.method == "PUT") {
    await updateHandler(req, res, accountID);
  }
  if (req.method == "DELETE") {
    await deletionHandler(req, res, accountID);
  }
}

async function genericRequestHandler(req, res) {
  if(Object.keys(req.query).length > 0 ){
    return res.status(400).end();
  }
  if (!req.headers.authorization) {
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
          return res.status(401).end();
        }
      } else {
        return res.status(400).end();
      }
    } catch (error) {
      return res.status(500).end();
    }
  }
}

async function getAllDataHandler(req, res, accountId) {
  allData = await assignmentModel.findAll();
  if (allData.length > 0) {
    return res.status(200).json(allData);
  } else {
    return res.status(204).end();
  }
}

async function getDataHandler(req, res, accountId) {
  console.log("get individual Assignment");
  const assignmentId = req.params.id;
  try {
    existingAssignment = await assignmentModel.findOne({
      where: {
        id: assignmentId,
      },
    });

    if (existingAssignment) {
      return res.status(200).json(existingAssignment);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).end();
  }
}

async function insertHandler(req, res, accountId) {
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

  requiredKeys.forEach((key) => {
    if (!(key in accountData)) {
      missingKeys.push(key);
    }
  });

  for (const key in req.body) {
    if (!requiredKeys.includes(key)) {
      return res.status(400).end();
    }
  }

  if (missingKeys.length > 0) {
    return res.status(400).end();
  }

  delete accountData.assignment_created;
  delete accountData.assignment_updated;

  try {
    postRes = await assignmentModel.create(accountData);
    return res.status(201).json(postRes);
  } catch (error) {
    console.error("Error creating assignment:", error);
    return res.status(400).end();
  }
}

async function updateHandler(req, res, accountId) {
  if((typeof req.body === "undefined" || Object.keys(req.body).length === 0) ||  !req.params.id) {
    return res.status(400).end();
  } 
  const assignmentId = req.params.id;
  const updateFields = req.body;
  delete updateFields.assignment_created;
  delete updateFields.assignment_updated;

  try {
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
            return res.status(204).end();
          } else {
            return res.status(400).end();
          }
        } else {
          return res.status(403).end();
        }
      } else {
        return res.status(404).end();
      }
    } catch (error) {
      return res.status(500).end();
    }
  } catch (error) {
    return res.status(500).end();
  }
}

async function deletionHandler(req, res, accountId) {
  if((req.body && Object.keys(req.body).length > 0) || Object.keys(req.params).length === 0) {
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
          return res.status(204).end();
        } else {
          res.status(403).end();
        }
      } else {
        res.status(404).end();
      }
    } catch (error) {
      res.status(500).end();
    }
  } catch (error) {
    res.status(500).end();
  }
}

module.exports = {
  assignmentsHandler: assignmentsHandler,
  getHandler: getHandler,
  putHandler: putHandler,
  postHandler: postHandler,
  deleteHandler: deleteHandler,
};
