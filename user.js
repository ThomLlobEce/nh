"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(name, firstName, email, ufr, year, cm, password) {
        var _this = this;
        this.addIcal = function (ical) {
            _this.ical = ical;
        };
        this.name = name;
        this.firstName = firstName;
        this.email = email;
        this.ufr = ufr;
        this.year = year;
        this.cm = cm;
        this.password = password;
        this.ical = '';
    }
    return User;
}());
exports["default"] = User;
