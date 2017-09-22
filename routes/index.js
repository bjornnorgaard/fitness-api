var express = require('express');
var router = express.Router();
var controller = require("../controller/fitnessController");

router.get("/", function(req, res) {
  res.json({message: "Welcome to Fitness API"});
});

// POST
router.post("/workouts", controller.postWorkout);
router.post("/exercises", controller.postExercise);
router.post("/logs", controller.postLog);

// GET
router.get("/workouts/", controller.getWorkouts);
router.get("/exercises/", controller.getExercises);
router.get("/logs", controller.getLogs);

// GET/:id
router.get("/workouts/:id", controller.getWorkout);
router.get("/exercises/:id", controller.getExercise);
router.get("/logs/:id", controller.getLog);

module.exports = router;
