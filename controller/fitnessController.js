var mongoose = require("mongoose");
var pw = require("../secrets.json").password;
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

var WorkoutModel = mongoose.model("Workouts", workoutSchema);
var LogModel = mongoose.model("Logs", logSchema);

module.exports.postWorkout = function(req, res) {
    var objectToReturn = { key: "post workout" };

    var workout = new WorkoutModel({
        foo: "hello world"
    });

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
