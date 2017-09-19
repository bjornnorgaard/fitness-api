var pw = "";
if (process.env.NODE_ENV == "production") {
    pw = process.env.password;
}
else {
    pw = require("../secrets.json").password;
}

var mongoose = require("mongoose");
mongoose.connect("mongodb://fitness-api:" + pw + "@ds038547.mlab.com:38547/ittweb-fitness")

var exerciseSchema = {
    title: String,
    description: String,
    reps: Number,
    sets: Number
}

var workoutSchema = {
    title: String,
    exercises: [exerciseSchema]
};

var logSchema = {
    date: Date,
    workoutId: Number
}

var ExerciseModel = mongoose.model("Exercises", exerciseSchema);
var WorkoutModel = mongoose.model("Workouts", workoutSchema);
var LogModel = mongoose.model("Logs", logSchema);

module.exports.postWorkout = function(req, res) {
    var objectToReturn = { key: "post workout" };

    // var workout = new WorkoutModel({
    //     title: "Morning workout",
    //     exercises: [
    //         new ExerciseModel({
    //             title: "Squats",
    //             description: "Do some squats, beefcake!",
    //             reps: 3,
    //             sets: 20
    //         })
    //     ]
    // });

    workout.save(function(err) {
        if (err) console.log(err);
        else console.log("Success!");
    });

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(objectToReturn));
}

module.exports.postExercise = function(req, res) {
    var objectToReturn = { key: "post exercise" };

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(objectToReturn));
}

module.exports.postLog = function(req, res) {
    var objectToReturn = { key: "post log" };

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(objectToReturn));
}

module.exports.getWorkout = function(req, res) {
    var objectToReturn = { key: "get workout" };

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(objectToReturn));
}

module.exports.getExercise = function(req, res) {
    var objectToReturn = { key: "get exercise" };

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(objectToReturn));
}

module.exports.getLog = function(req, res) {
    var objectToReturn = { key: "get log" };

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(objectToReturn));
}
