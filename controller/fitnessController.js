module.exports.postWorkout = function(req, res) {
    var objectToReturn = { key: "post workout" };

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
