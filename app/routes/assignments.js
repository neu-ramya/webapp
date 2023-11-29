const express = require("express");
const router = express.Router();
const assignmentsController = require("../controllers/AssignmentsController");

router.get("/", assignmentsController.getHandler);
router.get("/:id", assignmentsController.getHandler);
router.put("/:id", assignmentsController.putHandler);
router.put("/", assignmentsController.putHandler);
router.post("/", assignmentsController.postHandler);
router.post("/:id/submission", assignmentsController.postHandler);
router.delete("/:id", assignmentsController.deleteHandler);
router.delete("/", assignmentsController.deleteHandler);
router.patch("/", assignmentsController.methodNotAllowedHanlder);
router.patch("/:id", assignmentsController.methodNotAllowedHanlder);
router.post("/:id", assignmentsController.methodNotAllowedHanlder);
router.patch("/:id/submission", assignmentsController.methodNotAllowedHanlder);
router.get("/:id/submission", assignmentsController.methodNotAllowedHanlder);
router.put("/:id/submission", assignmentsController.methodNotAllowedHanlder);
router.delete("/:id/submission", assignmentsController.methodNotAllowedHanlder);
router.use("/", assignmentsController.assignmentsHandler);

module.exports = router;
