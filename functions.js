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
var ical = require('node-ical');
var event_1 = require("./event");
var colors = ["#ADBF94", "#E1EEF3", "#E4C4D0", "#DFCAD6", "#BF94A2", "#EFE5EC", "#CC9188"];
/** Load a list of event from an ICAL url */
function parseICALdata(icalUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var events, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    events = [];
                    i = 0;
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var eventsTab = [];
                            ical.fromURL(icalUrl, {}, function (err, data) {
                                for (var k in data) {
                                    i++;
                                    if (data.hasOwnProperty(k)) {
                                        var ev = data[k];
                                        if (data[k].type == 'VEVENT' && ev.summary && ev.location) {
                                            eventsTab.push(new event_1["default"](ev.summary.val || ev.summary, ev.location.val || ev.location, ev.start.getMinutes(), ev.start.getHours(), ev.start.getDate(), ev.start.getMonth(), 1900 + ev.start.getYear(), ev.end.getMinutes(), ev.end.getHours(), ev.end.getDate(), ev.end.getMonth(), 1900 + ev.end.getYear()));
                                        }
                                    }
                                    if (i === Object.keys(data).length) {
                                        resolve(eventsTab);
                                    }
                                }
                                resolve(eventsTab);
                            });
                        }).then(function (eventsTab) {
                            var eventsToReturn = onlyUpcomingEvents(eventsTab);
                            return eventsToReturn;
                        })];
                case 1:
                    events = _a.sent();
                    return [2 /*return*/, addColors(events)];
            }
        });
    });
}
exports.parseICALdata = parseICALdata;
/** Prevent from showing events that already happened & sort the remaining items*/
function onlyUpcomingEvents(ev) {
    var date;
    var eventsToReturn = [];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    ev.forEach(function (value) {
        date = months[parseInt(value.endMonth)] + '-' + value.endDay + ', ' + value.endYear + ' ' + value.endHours + ':' + value.endMinutes + ':00';
        if (Date.parse(date) > Date.now()) {
            eventsToReturn.push(value);
        }
    });
    eventsToReturn.sort(function (a, b) {
        var first = new Date(months[parseInt(a.startMonth)] + '-' + a.startDay + ', ' + a.startYear + ' ' + a.startHours + ':' + a.startMinutes + ':00');
        var second = new Date(months[parseInt(b.startMonth)] + '-' + b.startDay + ', ' + b.startYear + ' ' + b.startHours + ':' + b.startMinutes + ':00');
        return first > second ? 1 : first < second ? -1 : 0;
    });
    return eventsToReturn;
}
function addColors(events) {
    var last_color = -1;
    var r = -2;
    events.forEach(function (value) {
        do {
            r = Math.floor(Math.random() * colors.length);
        } while (last_color === r);
        last_color = r;
        value.addColor(colors[r]);
    });
    return events;
}
