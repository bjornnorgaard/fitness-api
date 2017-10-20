let crypto = require("crypto");
let jwt = require("jsonwebtoken");

var pw = "";
var jwt_key = "";
if (process.env.NODE_ENV == "production") {
    pw = process.env.password;
    jwt_key = process.env.JWT_KEY
}
else {
    pw = require("../secrets.json").password;
    jwt_key = require("../secrets.json").jwt_key;
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

var userSchema = {
    username: String,
    hash: String,
    salt: String,
};

var ExerciseModel = mongoose.model("Exercises", exerciseSchema);
var WorkoutModel = mongoose.model("Workouts", workoutSchema);
var LogModel = mongoose.model("Logs", logSchema);
var UserModel = mongoose.model("User", userSchema);

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

module.exports.postLogin = function (req, res) {
    var username = req.body.username;
    var pass = req.body.password;

    console.log("");
    console.log("postLogin(): username: " + username);
    console.log("postLogin(): password: " + pass);

    if (!username || !pass) {
        sendResponse(res, "Username and/or password was invalid");
        return;
    }

    UserModel.findOne({username: username}, "_id username hash salt", function (err, user) {
        if (err) {
            console.log("findOne(): " + err);
            sendResponse(res, err);
        }
        if (user) {
            console.log("user.id: " + user._id);
            console.log("user.username: " + user.username);
            console.log("user.hash: " + user.hash);
            console.log("user.salt: " + user.salt);
        }
        if (user && isAuthentic(user, pass)) {
            var token = generateToken(user);
            sendResponse(res, {msg: "User successfully authenticated", token: token});
        }
        else if (user && !isAuthentic(user, pass)) {
            sendResponse(res, "User not authentic");
        }
        else if (!user) {
            sendResponse(res, "User not found");
        }
        else {
            sendResponse(res, "Something didn't work!");
        }
    });
};

module.exports.postRegister = function (req, res) {
    var username = req.body.username;
    var pass = req.body.password;

    console.log("");
    console.log("postRegister(): username: " + username);
    console.log("postRegister(): password: " + pass);

    if (!username || !pass) {
        sendResponse(res, "Username and/or password was invalid");
    }

    var salt = crypto.randomBytes(16).toString("hex");
    var hash = generateHash(pass, salt);

    var newUser = new UserModel({
        username: username,
        hash: hash,
        salt: salt,
    });

    UserModel.findOne({username: username}, "username", function (err, user) {
        if (err) {
            console.log("findOne(): " + err);
            sendResponse(res, err);
        }
        if (user) {
            sendResponse(res, "User already exists, returning");
        }
        if (!user) {
            console.log("Saving user...");
            newUser.save(function (err) {
                console.log("User created");
                sendResponse(res, "User created");
            });
        }
    });
};

function sendResponse(res, message) {
    res.setHeader("Content-Type", "application/json");
    console.log(message);
    res.send(JSON.stringify(message));
}

function generateHash(pass, salt) {
    return crypto.pbkdf2Sync(pass, salt, 1000, 256, "sha512").toString("hex");
}

function generateToken(user) {
    console.log("");
    console.log("generateToken()");
    console.log("user.id: " + user._id);
    console.log("user.username: " + user.username);
    console.log("user.hash: " + user.hash);
    console.log("user.salt: " + user.salt);

    var payload = {
        id: user._id,
        username: user.username
    };

    var token = jwt.sign(payload, jwt_key, {
        expiresIn: 3600
    });

    console.log("token: " + token);
    console.log("");

    return token;
}

function isAuthentic(user, password) {
    console.log("");

    var hash = generateHash(password, user.salt);
    if (user.hash == hash) {
        console.log("isAuthentic() returned true");
        return true;
    }
    else {
        console.log("isAuthentic() returned false");
        return false;
    }
}
