var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require('ionic-angular');
var backand_1 = require('../../components/backand/backand');
var core_1 = require('angular2/core');
var Services = (function () {
    function Services(backand) {
        this.backand = backand;
        this.local = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
        this.hide = true;
    }
    Services.prototype.getUser = function () {
        var _this = this;
        this.backand.currentUser().subscribe(function (data) {
            _this.backand.auth_status = 'OK';
            _this.myUser = data[0];
        }, function (err) {
            var errorMessage = _this.backand.extractErrorMessage(err);
            _this.backand.auth_status = "Error: " + errorMessage;
            _this.backand.logError(err);
        });
    };
    Services.prototype.getAuth = function () {
        var auth = this.local.get('jwt')._result;
        this.backand.setTokenHeader(auth);
    };
    Services.prototype.areEqual = function (g) {
        var equal = g.value;
        var vals = Object.keys(equal).map(function (key) { return equal[key]; });
        if (vals[0] != vals[1]) {
            return { notEqual: true };
        }
        else {
            return null;
        }
    };
    Services.prototype.emailValidator = function (c) {
        if (!c.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return { 'invalidEmailAddress': true };
        }
        else {
            return null;
        }
    };
    Services.prototype.clearField = function (c) {
        var field = c;
        field.updateValue('');
        field.updateValueAndValidity();
        field.setErrors(null);
        //field._pristine = true;
    };
    Services.prototype.clearForm = function (g) {
        var form = g;
        for (var i in g.controls) {
            var input = g.find(i);
            input.updateValue('');
            input.updateValueAndValidity();
        }
    };
    Services.prototype.more = function () {
        this.hide = !this.hide;
    };
    Services.prototype.hideMore = function () {
        this.hide = true;
    };
    Services = __decorate([
        core_1.Injectable(),
        __metadata('design:paramtypes', [backand_1.Backand])
    ], Services);
    return Services;
})();
exports.Services = Services;
//# sourceMappingURL=services.js.map