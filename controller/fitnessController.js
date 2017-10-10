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
    workout: {type: Schema.Types.ObjectId, ref: "Workouts"},
    title: String,
    description: String,
    reps: Number,
    sets: Number
};

var logSchema = {
    workoutId: String,
    date: Date,
};

var workoutSchema = {
    _id: Schema.Types.ObjectId,
    title: String,
    exercises: [exerciseSchema]
};

var ExerciseModel = mongoose.model("Exercises", exerciseSchema);
var WorkoutModel = mongoose.model("Workouts", workoutSchema);
var LogModel = mongoose.model("Logs", logSchema);

module.exports.postWorkout = function (req, res) {
    console.log("Posting workout with title: " + req.body.title);

    var workout = new WorkoutModel({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
    });

    workout.save(function (err) {
        if (err) {
            console.log("Failed: " + err)
            var status = {status: "something went wrong"};
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
};

module.exports.postExercise = function (req, res) {
    var workoutId = req.body.workoutId;
    console.log("postExercise() received workoutId: " + workoutId);
    var exerciseTitle = req.body.title;
    console.log("postExercise() received exerciseTitle: " + exerciseTitle);
    var exerciseDescription = req.body.description;
    console.log("postExercise() received exerciseDescription: " + exerciseDescription);
    var exerciseSets = req.body.sets;
    console.log("postExercise() received exerciseSets: " + exerciseSets);
    var exerciseReps = req.body.reps;
    console.log("postExercise() received exerciseReps: " + exerciseReps);

    WorkoutModel.findById(workoutId, function (err, workout) {
        if (err) console.log("postExercise could not find workout by id");

        console.log("Will add exercise to this workout: " + workout);

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
                var status = {status: "something went wrong"};
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
};

module.exports.postLog = function (req, res) {
    var workoutId = req.body.workoutId;
    console.log("Posting log for workout id: " + workoutId);

    var log = new LogModel({
        workoutId: workoutId,
        date: new Date()
    });

    log.save(function (err) {
        if (err) {
            console.log("Failed: " + err)
            var status = {status: "something went wrong"};
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
};

module.exports.getWorkouts = function (req, res) {
    WorkoutModel.find(function (err, workout) {
        var response;
        if (err) {
            console.log("Failed: " + err)
            response = {status: "something went wrong"};
        }
        else {
            console.log('Success!');
            console.log(workout);
            response = workout;
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(response));
    });
};

module.exports.getExercises = function (req, res) {
    var workoutId = req.params.id;
    console.log("STARTED finding exercises for workout id: " + workoutId);

    WorkoutModel.findById(workoutId, function (err, workout) {
        var response;
        if (err) {
            response = {status: "ERROR while looking for workout"};
        }
        else {
            response = workout.exercises;
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(response));
    });
};

module.exports.getLogs = function (req, res) {
    LogModel.find(function (err, logs) {
        var response;
        if (err) {
            response = {status: "ERROR while looking for logs"};
        }
        else {
            response = logs;
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(response));
    });
};

module.exports.getWorkout = function (req, res) {
    var id = req.params.id;

    WorkoutModel.findById(id, function (err, workout) {
        if (err) console.log("getWorkout could not find workout by id");

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(workout));
    });
};

module.exports.getLogsForWorkout = function (req, res) {
    var workoutId = req.params.id;

    LogModel.find({"workoutId": workoutId}, function (err, logs) {
        var response;
        if (err) {
            response = {status: "ERROR while looking for logs"};
        }
        else {
            response = logs;
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(response));
    });
};
