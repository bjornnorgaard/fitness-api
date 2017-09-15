var express = require('express');
var router = express.Router();
var controller = require("../controller/fitnessController");

router.get("/", function(req, res) {
  res.json({message: "Welcome to Fitness API"});
});

router.post("/workouts", controller.postWorkout);
router.post("/exercises", controller.postExercise);
router.post("/logs", controller.postLog);

router.get("/workouts", controller.getWorkout);
router.get("/exercises", controller.getExercise);
router.get("/logs", controller.getLog);

module.exports = router;
