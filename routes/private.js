var express = require('express');
var router = express.Router();
var controller = require("../controller/fitnessController");

router.get("/workouts/", controller.getWorkouts);
router.get("/workouts/:id", controller.getWorkout);
router.get("/workouts/:id/logs", controller.getLogsForWorkout);
router.get("/workouts/:id/exercises", controller.getExercises);
router.get("/logs", controller.getLogs);
router.post("/login", controller.postLogin);
router.post("/register", controller.postRegister);

module.exports = router;
