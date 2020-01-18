"use strict";
exports.__esModule = true;
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
    return Event;
}());
exports["default"] = Event;
