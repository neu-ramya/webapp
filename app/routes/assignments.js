const express = require('express');
const router = express.Router();
const assignmentsController = require('../controllers/AssignmentsController');

router.get('/', assignmentsController.getHandler);
router.put('/', assignmentsController.putHandler);
router.post('/', assignmentsController.postHandler);
router.delete('/', assignmentsController.deleteHandler);
router.use('/', assignmentsController.assignmentsHandler);

module.exports = router;