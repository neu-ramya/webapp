require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { sequelize } = require('./config/database');
const { loadData } = require('./app/utils/data/loadData');

const Account = require('./app/models/Account');
const Assignment = require('./app/models/assignment');

const multer  = require('multer');
const upload = multer();

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await loadData();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();



app.use('/healthz', upload.none(), require('./app/routes/healthz'));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

