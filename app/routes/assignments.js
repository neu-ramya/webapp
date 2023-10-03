const express = require('express');
const router = express.Router();
const assignmentsController = require('../controllers/AssignmentsController');

router.get('/', assignmentsController.getHandler);
router.get('/:id', assignmentsController.getHandler);
router.put('/:id', assignmentsController.putHandler);
router.post('/', assignmentsController.postHandler);
router.delete('/:id', assignmentsController.deleteHandler);
router.use('/', assignmentsController.assignmentsHandler);

module.exports = router;