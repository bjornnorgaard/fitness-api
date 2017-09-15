var express = require('express');
var router = express.Router();
var controller = require("../controller/fitnessController");

router.post("/workouts", controller.postWorkout);
router.post("/exercises", controller.postExercise);
router.post("/logs", controller.postLog);

router.get("/workouts", controller.getWorkout);
router.get("/exercises", controller.getExercise);
router.get("/logs", controller.getLog);

module.exports = router;
