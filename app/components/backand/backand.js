var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
require('rxjs/Rx');
var Backand = (function () {
    function Backand(http) {
        this.http = http;
        this.auth_token = { header_name: '', header_value: '' };
        this.api_url = "https://api.backand.com";
        this.app_name = "ebc2";
        this.auth_type = "N/A";
        this.auth_status = "";
        this.is_auth_error = false;
    }
    Object.defineProperty(Backand.prototype, "tokenUrl", {
        get: function () {
            return this.api_url + '/token';
        },
        enumerable: true,
        configurable: true
    });
    Backand.prototype.signIn = function (user, pass) {
        var _this = this;
        this.auth_type = 'Token';
        var creds = ("username=" + user) +
            ("&password=" + pass) +
            ("&appName=" + this.app_name) +
            "&grant_type=password";
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.tokenUrl, creds, {
            headers: header
        })
            .map(function (res) { return _this.getToken(res); });
    };
    Backand.prototype.extractErrorMessage = function (err) {
        return JSON.parse(err._body).error_description;
    };
    Backand.prototype.setTokenHeader = function (jwt) {
        if (jwt) {
            this.auth_token.header_name = 'Authorization';
            this.auth_token.header_value = 'Bearer ' + jwt;
        }
    };
    Backand.prototype.getToken = function (res) {
        console.log(res);
        return res.json().access_token;
    };
    Object.defineProperty(Backand.prototype, "authHeader", {
        get: function () {
            var authHeader = new http_1.Headers();
            authHeader.append(this.auth_token.header_name, this.auth_token.header_value);
            return authHeader;
        },
        enumerable: true,
        configurable: true
    });
    Backand.prototype.logError = function (err) {
        console.error('Error: ' + err);
    };
    Backand.prototype.requestReset = function (email) {
        var _this = this;
        var header = new http_1.Headers();
        var reset = this.api_url + '/1/user/requestResetPassword';
        var resetData = JSON.stringify({
            appName: this.app_name,
            username: email
        });
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(reset, resetData, {
            headers: header
        })
            .map(function (res) { return _this.getToken(res); });
    };
    Backand.prototype.signUp = function (value) {
        var _this = this;
        var newUser = JSON.stringify(value);
        var sigUpUrl = this.api_url + '/1/user/signup';
        var header = new http_1.Headers();
        header.append('SignUpToken', 'dbaea0da-730d-4039-8f8a-77a507a3e908');
        return this.http.post(sigUpUrl, newUser, {
            headers: header
        })
            .map(function (res) { return _this.getToken(res); });
    };
    Backand.prototype.currentUser = function () {
        var userQuery = this.api_url + '/1/query/data/CurrentUser';
        return this.http.get(userQuery, {
            headers: this.authHeader
        }).map(function (res) { return res.json(); });
    };
    Backand.prototype.updatePass = function (pass) {
        var passwordChange = this.api_url + '/1/user/changePassword';
        var changePass = JSON.stringify(pass);
        this.authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(passwordChange, changePass, {
            headers: this.authHeader
        }).map(function (res) { return res; });
    };
    Backand.prototype.getItems = function (name) {
        var itemQuery = this.api_url + '/1/query/data/' + name;
        return this.http.get(itemQuery, {
            headers: this.authHeader
        }).map(function (res) { return res.json(); });
    };
    Backand.prototype.getItem = function (name, id) {
        var itemQuery = this.api_url + '/1/objects/' + name + '/' + id;
        return this.http.get(itemQuery, {
            headers: this.authHeader
        }).map(function (res) { return res.json(); });
    };
    Backand.prototype.updateItem = function (name, id, data) {
        var itemQuery = this.api_url + '/1/objects/' + name + '/' + id;
        var info = JSON.stringify(data);
        this.authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.put(itemQuery, info, {
            headers: this.authHeader
        }).map(function (res) { return res; });
    };
    Backand = __decorate([
        core_1.Injectable(),
        __metadata('design:paramtypes', [http_1.Http])
    ], Backand);
    return Backand;
})();
exports.Backand = Backand;
//# sourceMappingURL=backand.js.map
