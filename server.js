require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const multer  = require('multer');
const upload = multer();

app.use('/healthz', upload.none(), require('./app/routes/healthz'));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

