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
}
async function postHandler(req, res) {
  accountID = await checkAuth(req.headers.authorization);
  await insertHandler(req, res, accountID);
}

async function deleteHandler(req, res) {
  console.log("assignments delete handler");
}

async function checkAuth(authData) {
  auth = new Buffer(authData.split(" ")[1], "base64").toString().split(":");
  user = auth[0];
  pass = auth[1];
  hashPass = await bcrypt.hash(pass, 10);
  try {
    const accountDetails = await account.findOne({
      where: {
        email: user,
      },
    });

    if (accountDetails) {
      const pwMatch = await bcrypt.compare(pass, accountDetails.password);
      // Account found
      if (pwMatch) {
        console.log("Password matched");
        return accountDetails.id;
      } else {
        console.log("Password not matched");
      }
    } else {
      // Account not found
      console.log("Account not found");
    }
  } catch (error) {
    console.error("Error finding account:", error);
  }
}

async function insertHandler(req, res, accountId) {
  const requiredKeys = [
    "name",
    "points",
    "num_of_attempts",
    "deadline",
    "account_id"
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
    await assignmentModel.create(accountData);
    return res.status(200).json({ message: "Assignment created successfully" });
  } catch (error) {
    console.error("Error creating assignment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  assignmentsHandler: assignmentsHandler,
  getHandler: getHandler,
  putHandler: putHandler,
  postHandler: postHandler,
  deleteHandler: deleteHandler,
};
