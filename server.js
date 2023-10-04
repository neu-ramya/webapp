require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { sequelize } = require("./config/database");
const { loadData } = require("./app/utils/data/loadData");

const Account = require("./app/models/Account");
const Assignment = require("./app/models/Assignment");
console.log(process.env.DB_HOST)
console.log(process.env.DB_PASS)
console.log(process.env.DB_USER)
console.log(process.env.PROF_TABLES)
const multer = require("multer");
const upload = multer();

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await loadData();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use("/healthz", upload.none(), require("./app/routes/healthz"));
app.use("/assignments", upload.none(), require("./app/routes/assignments"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
