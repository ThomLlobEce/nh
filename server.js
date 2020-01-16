var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
// Defining a typical user
var User = /** @class */ (function () {
    function User(name, firstName, email, ufr, year, cm, password) {
        this.name = name;
        this.firstName = firstName;
        this.email = email;
        this.ufr = ufr;
        this.year = year;
        this.cm = cm;
        this.password = password;
    }
    return User;
}());
var users = [new User("Llobregat", "Thomas", "a@gmail.com", "54", 2020, "gter", "a")];
var auths = [];
app.use(bodyParser.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'Client/build')));
// API that can create an user if it has the required informations and add it into users array
app.post('/api/createUser', function (req, res) {
    console.log("*** API REQUEST (POST) : /api/createUser ***");
    var exist = false;
    var missingParams = false;
    if (!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.password) {
        missingParams = true;
    }
    else {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === req.body.email) {
                exist = true;
                break;
            }
        }
    }
    if (exist) {
        res.json({
            status: "failed",
            message: "Email already exists"
        });
    }
    else if (missingParams) {
        res.json({
            status: "failed",
            message: "Missing parameters"
        });
    }
    else {
        users.push(new User(req.body.last_name, req.body.first_name, req.body.email, req.body.ufr, req.body.year, req.body.cm, req.body.password));
        res.json({
            status: "success",
            message: "User added"
        });
    }
});
// API that sign a user in if it exist and it is not already logged. Then add its email to auths array.
app.get('/api/signIn', function (req, res) {
    console.log("*** API REQUEST (GET) : /api/signIn ***");
    var user;
    var exist = false;
    // If the requested pair email / password has a match
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === req.query.email && users[i].password === req.query.password) {
            // Verifying that the user isn't logged yet
            for (var j = 0; j < auths.length; j++) {
                if (auths[j] = users[i].email) {
                    exist = true;
                    break;
                }
            }
            // If the user isn't logged yet, adding him to the auths.
            if (!exist) {
                user = users[i];
                auths.push(users[i].email);
            }
            else {
                user = users[i];
            }
            break;
        }
    }
    if (user) {
        console.log(user.email + " has successfully been signed in.");
        res.json({ status: "success", message: user });
    }
    else if (exist) {
        console.log(user.email + " has been signed but he was already signed in.");
        res.json({ status: "sucess", message: user });
    }
    else {
        console.log(req.query.email + " does not exists.");
        res.json({ status: "failed", message: "error" });
    }
});
// API that check if a user is authenticated by looking for its email into the auths array.
app.get('/api/isAuth', function (req, res) {
    console.log("*** API REQUEST (GET) : /api/isAuth ***");
    var auth = false;
    for (var i = 0; i < auths.length; i++) {
        if (auths[i] === req.query.email) {
            auth = true;
        }
    }
    if (auth) {
        console.log(req.query.email + " is already authenticated.");
        res.json({ status: "success", message: auth });
    }
    else {
        console.log(req.query.email + " is not authenticated.");
        res.json({ status: "failed", message: auth });
    }
});
// API that disconnect a user based on the provided email. So it removes it from auths array.
app.get('/api/disconnect', function (req, res) {
    console.log("*** API REQUEST (GET) : /api/isAuth ***");
    var disconnect = false;
    for (var i = 0; i < auths.length; i++) {
        if (auths[i] === req.query.email) {
            auths.splice(i, 1);
            disconnect = true;
        }
    }
    if (disconnect) {
        console.log(req.query.email + " has successfully been disconnected.");
        res.json({ status: "success", message: disconnect });
    }
    else {
        console.log(req.query.email + " cannot be deconnected.");
        res.json({ status: "failed", message: disconnect });
    }
});
// Handles any requests that don't match the ones above
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/Client/build/index.html'));
});
var port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);
