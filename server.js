"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var user_1 = require("./user");
var functions_1 = require("./functions");
// https://planning-paris.inseecu.net/Telechargements/ical/Edt_LLOBREGAT.ics?version=2019.0.4.0&idICal=ED8C99CB6BE8F57EC536877E01FC1D6F&param=643d5b312e2e36325d2666683d3126663d31
var users = [
    new user_1["default"]("Llobregat", "Thomas", "a@gmail.com", "54", 2020, "gter", "a", true),
    new user_1["default"]("Babel", "Mattis", "b@gmail.com", "54", 2020, "gter", "b", false)
];
var auths = [];
var eventRequiringHelpers = [];
app.use(bodyParser.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'Client/build')));
// API that can create an user if it has the required informations and add it into users array
app.post('/api/createUser', function (req, res) {
    console.log("*** API REQUEST (POST) : /api/createUser ***");
    console.log("Parameters given : " + req.body);
    var exist = false;
    var missingParams = false;
    if (!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.ufr || !req.body.year || !req.body.cm || !req.body.password || req.body.need) {
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
        console.log("ERROR : A user with the same email already exists.");
        res.json({
            status: "failed",
            message: "Email already exists"
        });
    }
    else if (missingParams) {
        console.log("ERROR : Not enough parameters given. Check readme.md to have more informations.");
        res.json({
            status: "failed",
            message: "Missing parameters"
        });
    }
    else {
        console.log(req.body.email + " has successfully been created.");
        users.push(new user_1["default"](req.body.last_name, req.body.first_name, req.body.email, req.body.ufr, req.body.year, req.body.cm, req.body.password, req.body.need));
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
    var need = null;
    for (var i = 0; i < auths.length; i++) {
        if (auths[i] === req.query.email) {
            for (var j = 0; j < users.length; j++) {
                if (users[j].email === auths[i]) {
                    auth = true;
                    need = users[j].need;
                    break;
                }
            }
            break;
        }
    }
    if (auth) {
        console.log(req.query.email + " is already authenticated.");
        res.json({ status: "success", message: need });
    }
    else {
        console.log(req.query.email + " is not authenticated.");
        res.json({ status: "failed", message: "User is not authenticated" });
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
app.post('/api/addIcalToUser', function (req, res) {
    console.log("*** API REQUEST (GET) : /api/addIcalToUser ***");
    console.log("Parameters given : " + req.body);
    var exist = false;
    var missingParams = false;
    var logged = false;
    // Verifying parameters
    if (!req.body.email || !req.body.ical) {
        missingParams = true;
    }
    else {
        // Verifying that the user exists
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === req.body.email) {
                exist = true;
                // Verifying that the user is logged
                for (var j = 0; j < auths.length; j++) {
                    if (auths[j] === req.body.email) {
                        logged = true;
                        users[i].addIcal(req.body.ical);
                    }
                }
            }
        }
    }
    if (!exist) {
        console.log("ERROR : No user " + req.body.email + " exists");
        res.json({
            status: "failed",
            message: "User does not exist"
        });
    }
    else if (missingParams) {
        console.log("ERROR : Not enough parameters given. Check readme.md to have more informations.");
        res.json({
            status: "failed",
            message: "Missing parameters"
        });
    }
    else if (!logged) {
        console.log(req.body.email + " is not logged in.");
    }
    else {
        console.log(req.body.ical + " has correctly been added to user with email " + req.body.email);
        res.json({
            status: "success",
            message: "Ical added"
        });
    }
});
app.get('/api/getIcalData', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var exist, missingParams, logged, user, i, j, events;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("*** API REQUEST (GET) : /api/getIcalData ***");
                    console.log("Parameters given : " + JSON.stringify(req.body));
                    exist = false;
                    missingParams = false;
                    logged = false;
                    user = -1;
                    // Verifying parameters
                    if (!req.query.email) {
                        missingParams = true;
                    }
                    else {
                        // Verifying that the user exists
                        for (i = 0; i < users.length; i++) {
                            if (users[i].email === req.query.email) {
                                exist = true;
                                // Verifying that the user is logged
                                for (j = 0; j < auths.length; j++) {
                                    if (auths[j] === req.query.email) {
                                        logged = true;
                                        user = i;
                                    }
                                }
                            }
                        }
                    }
                    if (!!exist) return [3 /*break*/, 1];
                    console.log("ERROR : No user " + req.query.email + " exists");
                    res.json({
                        status: "failed",
                        message: "User does not exist"
                    });
                    return [3 /*break*/, 6];
                case 1:
                    if (!missingParams) return [3 /*break*/, 2];
                    console.log("ERROR : Not enough parameters given. Check readme.md to have more informations.");
                    res.json({
                        status: "failed",
                        message: "Missing parameters"
                    });
                    return [3 /*break*/, 6];
                case 2:
                    if (!!logged) return [3 /*break*/, 3];
                    console.log(req.query.email + " is not logged in.");
                    return [3 /*break*/, 6];
                case 3:
                    if (!(user != -1)) return [3 /*break*/, 5];
                    return [4 /*yield*/, functions_1.parseICALdata(users[user])];
                case 4:
                    events = _a.sent();
                    console.log("Data successfully fetched");
                    res.json({
                        status: "success",
                        message: events
                    });
                    return [3 /*break*/, 6];
                case 5:
                    console.log("Internal error.");
                    res.json({
                        status: "failed",
                        message: "internal server error."
                    });
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
});
app.post('/api/addHelpRequest', function (req, res) {
    console.log("*** API REQUEST (GET) : /api/addHelpRequest ***");
    console.log("Parameters given : " + JSON.stringify(req.body));
    var exist = false;
    var missingParams = false;
    // Verifying parameters
    if (!req.body.requester || !req.body.event) {
        missingParams = true;
    }
    else {
        var _loop_1 = function () {
            if (users[i].email === req.body.requester.email) {
                exist = true;
                // Adding the user and the event to DB
                var months_1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                eventRequiringHelpers.push({ requester: req.body.requester, event: req.body.event });
                eventRequiringHelpers.sort(function (a, b) {
                    var first = new Date(months_1[parseInt(a.event.startMonth)] + '-' + a.event.startDay + ', ' + a.event.startYear + ' ' + a.event.startHours + ':' + a.event.startMinutes + ':00');
                    var second = new Date(months_1[parseInt(b.event.startMonth)] + '-' + b.event.startDay + ', ' + b.event.startYear + ' ' + b.event.startHours + ':' + b.event.startMinutes + ':00');
                    return first > second ? 1 : first < second ? -1 : 0;
                });
                console.log("Event and requester correctly added to DB : " + JSON.stringify({ requester: req.body.requester, event: req.body.event }));
            }
        };
        // Verifying that the helper exists
        for (var i = 0; i < users.length; i++) {
            _loop_1();
        }
    }
    if (!exist) {
        console.log("ERROR : No user " + req.body.requester.email + " exists");
        res.json({
            status: "failed",
            message: "User does not exist"
        });
    }
    else if (missingParams) {
        console.log("ERROR : Not enough parameters given. Check readme.md to have more informations.");
        res.json({
            status: "failed",
            message: "Missing parameters"
        });
    }
    else {
        res.json({
            status: "success",
            message: "Event correctly added to DB"
        });
    }
});
app.get('/api/getUpcommingEvents', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("*** API REQUEST (GET) : /api/getUpcommingEvents ***");
            res.json({
                status: "success",
                message: eventRequiringHelpers
            });
            return [2 /*return*/];
        });
    });
});
// Handles any requests that don't match the ones above
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/Client/build/index.html'));
});
var port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);
