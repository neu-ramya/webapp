const express = require('express');
const router = express.Router();
const healthController = require('../controllers/HealthController');

router.use('/', healthController.healthzHandler);

module.exports = router;




