var express = require('express');
var router = express.Router();
var controller = require("../controller/fitnessController");

router.get("/", function(req, res) {
  res.json( {
    welcome: "Welcome to Fitness API",
    content: "The available routes are defined below",
    disclaimer: "Currently no feature is implemented or planned for allowing DELETE or PUT/PATCH of any element",
    routes: [
      {
        POST: [
          { route: "/login", description: "Call user credentials to get token" },
          { route: "/register", description: "Creates user" },
          { route: "/workouts", description: "Creates a Workout" },
          { route: "/exercises", description: "Creates an Exercises" },
          { route: "/logs", description: "Creates a Log" }
        ],
        GET: [
          { route: "/workouts/", description: "Gets all Workouts" },
          { route: "/workouts/:id", description: "Gets a Workout with {id}" },
          { route: "/workouts/:id/logs", description: "Gets all Logs related to workout with {id}" },
          { route: "/workouts/:id/exercises", description: "Gets all Exercises related to workout with {id}" },
          { route: "/logs", description: "Gets all Logs" },
        ]
      }
    ]
  });
});

router.get("/workouts/", controller.getWorkouts);
router.get("/workouts/:id", controller.getWorkout);
router.get("/workouts/:id/logs", controller.getLogsForWorkout);
router.get("/workouts/:id/exercises", controller.getExercises);
router.get("/logs", controller.getLogs);
router.post("/login", controller.postLogin);
router.post("/register", controller.postRegister);

module.exports = router;
