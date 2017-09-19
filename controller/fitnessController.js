var pw = "";
if (process.env.NODE_ENV == "production") {
    pw = process.env.password;
}
else {
    pw = require("../secrets.json").password;
}

var mongoose = require("mongoose");
var schema = mongoose.Schema;
mongoose.connect("mongodb://fitness-api:" + pw + "@ds038547.mlab.com:38547/ittweb-fitness")

var exerciseSchema = {
    workoutId: Number,
    title: String,
    description: String,
    reps: Number,
    sets: Number
}

var workoutSchema = {
    title: String
};

var logSchema = {
    date: Date,
    workoutId: Number
}

var ExerciseModel = mongoose.model("Exercises", exerciseSchema);
var WorkoutModel = mongoose.model("Workouts", workoutSchema);
var LogModel = mongoose.model("Logs", logSchema);

module.exports.postWorkout = function(req, res) {
    console.log("Posting workout with title: " + req.body.title);

    var workout = new WorkoutModel({
        title: req.body.title,
    });

    workout.save(function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Success!");
            WorkoutModel.find({title: req.body.title}, function(err, workout) {
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify(workout));
            });
        }
    });
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
    var title = req.params.title;
    console.log("Will search for this title: " + title);

    WorkoutModel
    .find({title: title})
    .populate("exercises")
    .exec(function(err, workout) {
        if (err) {
            console.log(err);
        }
        var w = JSON.stringify(workout);
        let derp = JSON.parse(w);
        console.log(derp);
    });

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
