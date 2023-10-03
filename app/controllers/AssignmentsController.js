const assignmentModel = require("../models/assignment");
const bcrypt = require("bcrypt");
const account = require("../models/Account");

async function assignmentsHandler(req, res) {
  console.log("assignments handler");
}

async function getHandler(req, res) {
  console.log("assignments get handler");
}
async function putHandler(req, res) {
  console.log("assignments put handler");
  await genericRequestHandler(req, res);
}
async function postHandler(req, res) {
  await genericRequestHandler(req, res);
}

async function deleteHandler(req, res) {
  console.log("assignments delete handler");
}

async function methodDistributor(req, res, accountID) {
  if (req.method == "POST") {
    await insertHandler(req, res, accountID);
  }
  if (req.method == "PUT") {
    await updateHandler(req, res, accountID);
  }
}

async function genericRequestHandler(req, res) {
  auth = new Buffer(req.headers.authorization.split(" ")[1], "base64")
    .toString()
    .split(":");
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
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      return res.status(400).json({ error: "Account not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error while inserting data" });
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

  if (missingKeys.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing required keys: ${missingKeys.join(", ")}` });
  }

  try {
    postRes = await assignmentModel.create(accountData);
    return res.status(201).json(postRes);
  } catch (error) {
    console.error("Error creating assignment:", error);
    return res.status(400).end();
  }
}

async function updateHandler(req, res, accountId) {
  const assignmentId = req.params.id;
  const updateFields = req.body;

  try {
    try {
      isAssignmentFound = await assignmentModel.findOne({
        where: {
          id: assignmentId,
        },
      });

      if (isAssignmentFound) {
        if ((isAssignmentFound.account_id == accountId)) {
          const [updatedRowsCount] = await assignmentModel.update(
            updateFields,
            {
              where: {
                id: assignmentId,
              },
            }
          );

          if (updatedRowsCount > 0) {
            res
              .status(204)
              .json({ message: "Assignment updated successfully" });
          } else {
            res.status(400).end();
          }
        } else {
          res.status(403).json({ message: "Forbidden request" });
        }
      } else {
        console.log('************');
        console.log(isAssignmentFound);
        console.log('************');
        res.status(404).json({ error: "Assignment not found" });
      }
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error updating assignment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  assignmentsHandler: assignmentsHandler,
  getHandler: getHandler,
  putHandler: putHandler,
  postHandler: postHandler,
  deleteHandler: deleteHandler,
};
