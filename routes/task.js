const express = require("express");
const router = express.Router();
const moment = require("moment");
const controller = require('../controllers/controls')

router.post("/add-new-task",controller.addTaskController);

router.post("/update-task/:id",controller.updateTaskController);

router.get("/confirm-delete",controller.deleteTaskController);

router.get("/add-new-task",controller.addTaskFormController);

router.get("/",controller.homeController);

router.get("/update-task",controller.updateTaskFormController);

router.get("/delete-task",controller.deleteTaskFormController);

module.exports = router;