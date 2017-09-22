var pw = "";
if (process.env.NODE_ENV == "production") {
    pw = process.env.password;
}
else {
    pw = require("../secrets.json").password;
}

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://fitness-api:" + pw + "@ds038547.mlab.com:38547/ittweb-fitness")

var exerciseSchema = {
    workout: { type: Schema.Types.ObjectId, ref: "Workouts" },
    title: String,
    description: String,
    reps: Number,
    sets: Number
}

var logSchema = {
    workoutId: String,
    date: Date,
}

var workoutSchema = {
    _id: Schema.Types.ObjectId,
    title: String,
    exercises: [ exerciseSchema ]
};

var ExerciseModel = mongoose.model("Exercises", exerciseSchema);
var WorkoutModel = mongoose.model("Workouts", workoutSchema);
var LogModel = mongoose.model("Logs", logSchema);

// POST //
module.exports.postWorkout = function(req, res) {
    console.log("Posting workout with title: " + req.body.title);

    var workout = new WorkoutModel({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
    });

    workout.save(function(err) {
        if (err) {
            console.log("Failed: " + err)
            var status = { status: "something went wrong" };
        }
        else {
            console.log('Success!');
            var status = {
                status: "workout successfully added",
                id: workout._id
            };
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(status));
    });
}

module.exports.postExercise = function(req, res) {
    var workoutId = req.body.workoutId;
    var exerciseTitle = req.body.title;
    var exerciseDescription = req.body.description;
    var exerciseSets = req.body.sets;
    var exerciseReps = req.body.reps;

    WorkoutModel.findById(workoutId, function (err, workout) {
        if (err) console.log("postExercise could not find workout by id");

        console.log("Will add exercise to this workout: " + workout);

        console.log("workout id: " + workoutId);
        console.log("exercise title: " + exerciseTitle);
        console.log("exercise desc: " + exerciseDescription);
        console.log("exercise sets: " + exerciseSets);
        console.log("exercies reps: " + exerciseReps);

        var exercise = new ExerciseModel({
            title: exerciseTitle,
            description: exerciseDescription,
            sets: exerciseSets,
            reps: exerciseReps,
        });

        workout.exercises.push(exercise);

        workout.save(function (err) {
            if (err) {
                console.log("Failed: " + err)
                var status = { status: "something went wrong" };
            }
            else {
                console.log('Success!');
                var status = {
                    status: "exercise added successfully",
                    id: exercise._id
                };
            }
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(status));
        });
    });
}

module.exports.postLog = function(req, res) {
    var workoutId = req.body.workoutId;
    console.log("Posting log for workout id: " + workoutId);

    var log = new LogModel({
        workoutId: workoutId,
        date: new Date()
    });

    log.save(function(err) {
        if (err) {
            console.log("Failed: " + err)
            var status = { status: "something went wrong" };
        }
        else {
            console.log('Success!');
            var status = {
                status: "log successfully added",
                id: log._id
            };
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(status));
    });
}

// GET
module.exports.getWorkouts = function(req, res) {
    WorkoutModel.find(function(err, workout) {
        if (err) {
            console.log("Failed: " + err)
            var status = { status: "something went wrong" };
        }
        else {
            console.log('Success!');
            console.log(workout);
            var status = {
                status: "exercise added successfully",
                id: exercise._id
            };
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(status));
    });

    var objectToReturn = { key: "get all workouts" };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(objectToReturn));
}

module.exports.getExercises = function(req, res) {
    var objectToReturn = { key: "get all exercises" };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(objectToReturn));
}

module.exports.getLogs = function(req, res) {
    var objectToReturn = { key: "get all logs" };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(objectToReturn));
}

// GET/:id
module.exports.getWorkout = function(req, res) {
    var id = req.params.id;
    console.log("Will search for this title: " + id);

    WorkoutModel
    .find({title: id})
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
    var objectToReturn = { key: "get exercise by id" };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(objectToReturn));
}

module.exports.getLog = function(req, res) {
    var objectToReturn = { key: "get log by id" };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(objectToReturn));
}
