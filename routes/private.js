var express = require('express');
var router = express.Router();
var controller = require("../controller/fitnessController");

router.post("/workouts", controller.postWorkout);
router.post("/exercises", controller.postExercise);
router.post("/logs", controller.postLog);

module.exports = router;
