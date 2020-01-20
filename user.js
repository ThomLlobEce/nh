"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(name, firstName, email, ufr, year, cm, password, need) {
        var _this = this;
        // SETTERS
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
        this.need = need;
    }
    return User;
}());
exports["default"] = User;
