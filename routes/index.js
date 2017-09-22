var express = require('express');
var router = express.Router();
var controller = require("../controller/fitnessController");

router.get("/", function(req, res) {
  res.json({message: "Welcome to Fitness API"});
});

router.post("/workouts", controller.postWorkout);
router.post("/exercises", controller.postExercise);
router.post("/logs", controller.postLog);

router.get("/workouts/", controller.getWorkouts);
router.get("/workouts/:id", controller.getWorkout);
router.get("/workouts/:id/logs", controller.getLogsForWorkout);
router.get("/workouts/:id/exercises", controller.getExercises);

router.get("/logs", controller.getLogs);

module.exports = router;
