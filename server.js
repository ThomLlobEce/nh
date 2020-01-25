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
var nodemailer = require('nodemailer');
var admin = require('firebase-admin');
var functions_1 = require("./functions");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nanterrehang@gmail.com',
        pass: 'AzertyuioP'
    }
});
var serviceAccount = require('./serviceAccountKey.json');
// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var Users = admin.firestore().collection("Users");
var EventsRequiringHelp = admin.firestore().collection("EventsRequiringHelp");
app.use(bodyParser.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'Client/build')));
app.post('/api/getIcalData', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var events_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("*** API REQUEST (POST) : /api/getIcalData ***");
                    console.log("Parameters given : " + JSON.stringify(req.body));
                    if (!!req.body.ical) return [3 /*break*/, 1];
                    console.log("ERROR : Not enough parameters given. Check readme.md to have more informations.");
                    res.json({
                        status: "failed",
                        message: "Missing parameters"
                    });
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, functions_1.parseICALdata(req.body.ical)];
                case 2:
                    events_1 = _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            EventsRequiringHelp.get().then(function (snapshot) {
                                snapshot.forEach(function (doc) {
                                    if (doc.data().helper) {
                                        events_1.forEach(function (value) {
                                            if (value.equals(doc.data())) {
                                                value.addHelper(doc.data().helper);
                                            }
                                        });
                                    }
                                });
                            })
                                .then(function () { return resolve(); });
                        })];
                case 3:
                    _a.sent();
                    if (events_1.length > 0) {
                        console.log("ICAL data successfully fetched");
                        res.json({
                            status: "success",
                            message: events_1
                        });
                    }
                    else {
                        console.log("Return empty set, url specified may not work");
                        res.json({
                            status: "failed",
                            message: "Return empty set, url specified may not work"
                        });
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.post('/api/sendEmail', function (req, res) {
    console.log("*** API REQUEST (POST) : /api/sendEmail ***");
    console.log("Parameters given : " + JSON.stringify(req.body));
    if (req.body.to && req.body.subject && req.body.email && req.body.event) {
        var mailOptions = {
            from: 'nanterreHang@gmail.com',
            to: req.body.to,
            subject: req.body.subject,
            html: ("<b>" + req.body.email + " souhaite vous aider pour l'évenement suivant :</b>"
                + "<p> Nom de l'événement : " + req.body.event.title + '\n'
                + "Date de l'événement : " + '\n'
                + "Lieu de l'événement : " + req.body.event.location + '\n'
                + "Si vous souhaitez participer à cette événement, cliquez sur le lien suivant : "
                + "<a href=\"http://localhost:5000/event?event=" + req.body.event.id + "&helper=" + req.body.email + "\">http://localhost:5000/event?event=" + req.body.event.id + "&helper=" + req.body.email + "</a></p>")
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({
                    status: 'failed',
                    message: error
                });
            }
            else {
                console.log('Email sent: ' + info.response);
                res.json({
                    status: 'success',
                    message: 'Email sent: ' + info.response
                });
            }
        });
    }
    else {
        res.json({
            status: 'failed',
            message: 'Not enough parameters given'
        });
    }
});
app.get('/event', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var del, helper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("*** API REQUEST (GET) : /event ***");
                    console.log("Parameters given : " + JSON.stringify(req.query));
                    if (!(req.query.event && req.query.helper)) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            EventsRequiringHelp.doc(req.query.event).get().then(function (doc) {
                                if (doc.exists) {
                                    if (doc.data().potentHelper.includes(req.query.helper)) {
                                        resolve(true);
                                    }
                                    else {
                                        res.json({
                                            status: "failed",
                                            message: "The helper is not in the potent list"
                                        });
                                        resolve(false);
                                    }
                                }
                                else {
                                    res.json({
                                        status: "failed",
                                        message: "This event does not exist"
                                    });
                                    resolve(false);
                                }
                            });
                        })
                        // Get the helper
                    ];
                case 1:
                    del = _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            Users.doc(req.query.helper).get().then(function (doc) {
                                if (doc.exists) {
                                    if (doc.data().need === false) {
                                        resolve(true);
                                    }
                                    else {
                                        res.json({
                                            status: 'failed',
                                            message: 'This user is not an helper'
                                        });
                                    }
                                }
                                else {
                                    res.json({
                                        status: 'failed',
                                        message: 'This user does not exist'
                                    });
                                    resolve(null);
                                }
                            });
                        })];
                case 2:
                    helper = _a.sent();
                    if (del && helper) {
                        // Delete potent helpers
                        EventsRequiringHelp.doc(req.query.event).update({
                            potentHelper: admin.firestore.FieldValue["delete"]()
                        });
                        // set new field helper to value email
                        EventsRequiringHelp.doc(req.query.event).update({
                            helper: req.query.helper
                        });
                        res.redirect('/');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    res.json({
                        status: 'failed',
                        message: 'Not enough parameters given'
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
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
