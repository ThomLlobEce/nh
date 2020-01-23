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
var functions_1 = require("./functions");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nanterrehang@gmail.com',
        pass: 'AzertyuioP'
    }
});
// https://planning-paris.inseecu.net/Telechargements/ical/Edt_LLOBREGAT.ics?version=2019.0.4.0&idICal=ED8C99CB6BE8F57EC536877E01FC1D6F&param=643d5b312e2e36325d2666683d3126663d31
app.use(bodyParser.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'Client/build')));
app.post('/api/getIcalData', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var events;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("*** API REQUEST (GET) : /api/getIcalData ***");
                    console.log("Parameters given : " + JSON.stringify(req.body));
                    if (!!req.body.ical) return [3 /*break*/, 1];
                    console.log("ERROR : Not enough parameters given. Check readme.md to have more informations.");
                    res.json({
                        status: "failed",
                        message: "Missing parameters"
                    });
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, functions_1.parseICALdata(req.body.ical)];
                case 2:
                    events = _a.sent();
                    if (events.length > 0) {
                        console.log("Data successfully fetched");
                        res.json({
                            status: "success",
                            message: events
                        });
                    }
                    else {
                        console.log("Return empty set, url specified may not work");
                        res.json({
                            status: "failed",
                            message: "Return empty set, url specified may not work"
                        });
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
app.post('/api/sendEmail', function (req, res) {
    console.log("*** API REQUEST (GET) : /api/getIcalData ***");
    console.log("Parameters given : " + JSON.stringify(req.body));
    if (req.body.to && req.body.subject && req.body.text) {
        var mailOptions = {
            from: 'nanterreHang@gmail.com',
            to: req.body.to,
            subject: req.body.subject,
            html: req.body.text
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
// Handles any requests that don't match the ones above
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/Client/build/index.html'));
});
var port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);
