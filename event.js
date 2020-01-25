"use strict";
exports.__esModule = true;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var Event = /** @class */ (function () {
    function Event(title, location, startMinutes, startHours, startDay, startMonth, startYear, endMinutes, endHours, endDay, endMonth, endYear) {
        this.title = title;
        this.location = location;
        this.startMinutes = startMinutes;
        this.startHours = startHours;
        this.startDay = startDay;
        this.startMonth = startMonth;
        this.startYear = startYear;
        this.endDay = endDay;
        this.endMonth = endMonth;
        this.endYear = endYear;
        this.endMinutes = endMinutes;
        this.endHours = endHours;
    }
    Event.prototype.addColor = function (color) {
        this.color = color;
    };
    Event.prototype.addHelper = function (name) {
        this.helper = name;
    };
    Event.prototype.equals = function (object) {
        if (object.title === this.title && object.location === this.location) {
            var beginThis = new Date(months[parseInt(this.startMonth)] + '-' + this.startDay + ', ' + this.startYear + ' ' + this.startHours + ':' + this.startMinutes + ':00');
            var endThis = new Date(months[parseInt(this.endMonth)] + '-' + this.endDay + ', ' + this.endYear + ' ' + this.endHours + ':' + this.endMinutes + ':00');
            var beginObject = new Date(object.start._seconds * 1000);
            var endObject = new Date(object.end._seconds * 1000);
            if (beginObject.getTime() === beginThis.getTime() && endObject.getTime() === endThis.getTime()) {
                return true;
            }
            else
                return false;
        }
        else
            return false;
    };
    return Event;
}());
exports["default"] = Event;
