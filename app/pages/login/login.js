var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var common_1 = require('@angular/common');
var ionic_angular_1 = require('ionic-angular');
var backand_1 = require('../../components/backand/backand');
var services_1 = require('../../components/services/services');
var create_1 = require('../create/create');
var sidemenu_1 = require('../sidemenu/sidemenu');
var LoginPage = (function () {
    function LoginPage(nav, backand, services) {
        this.nav = nav;
        this.backand = backand;
        this.services = services;
        this.signUp = create_1.CreatePage;
        this.local = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
        this.username = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, this.services.emailValidator]));
        this.password = new common_1.Control('', common_1.Validators.required);
        this.attempts = 0;
        this.loginForm = new common_1.ControlGroup({
            username: this.username,
            password: this.password
        });
    }
    LoginPage.prototype.ngDoCheck = function () {
        if (this.attempts >= 5) {
            this.reset = true;
        }
    };
    LoginPage.prototype.resetVerify = function () {
        var resVerify = ionic_angular_1.Toast.create({
            message: 'Check Your Email for Password Reset',
            duration: 3000
        });
        resVerify.onDismiss(function () {
            console.log('Dismissed toast');
        });
        this.nav.present(resVerify);
    };
    LoginPage.prototype.openPage = function (page) {
        this.nav.push(page);
    };
    LoginPage.prototype.clearAll = function () {
        this.services.clearForm(this.loginForm);
    };
    LoginPage.prototype.loggedIn = function () {
        var nav = this.nav;
        nav.setPages([{ page: sidemenu_1.SideMenu }], { animate: true });
    };
    LoginPage.prototype.resetPass = function () {
        var _this = this;
        var sets = ionic_angular_1.Alert.create({
            title: 'Reset Password',
            message: 'Enter Email to Recieve a Password Reset Link',
            inputs: [
                {
                    name: 'username',
                    placeholder: 'Email',
                    type: 'email'
                },
            ],
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Submit',
                    handler: function (data) {
                        var e = data.username;
                        console.log(e);
                        _this.backand.requestReset(e).subscribe(function (data) { return console.log('Reset Request Sent'); }, function (err) {
                            console.log(err);
                        }, function () {
                            _this.resetVerify();
                            console.log('Check Your Email');
                        });
                    }
                }
            ]
        });
        this.nav.present(sets);
    };
    LoginPage.prototype.signIn = function (login) {
        var _this = this;
        var auth = login.value;
        this.backand.signIn(auth.username, auth.password).subscribe(function (data) {
            _this.backand.auth_status = 'OK';
            _this.backand.is_auth_error = false;
            _this.backand.setTokenHeader(data);
            _this.local.set('jwt', data);
        }, function (err) {
            var errorMessage = _this.backand.extractErrorMessage(err);
            _this.backand.auth_status = "Error: " + errorMessage;
            _this.backand.is_auth_error = true;
            _this.error = _this.backand.is_auth_error;
            _this.backand.logError(err);
            _this.attempts = _this.attempts + 1;
            _this.clearAll();
        }, function () {
            console.log('Finish Auth');
            _this.loggedIn();
            _this.clearAll();
        });
    };
    LoginPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/login/login.html',
            directives: [common_1.FORM_DIRECTIVES]
        }),
        __metadata('design:paramtypes', [ionic_angular_1.NavController, backand_1.Backand, services_1.Services])
    ], LoginPage);
    return LoginPage;
})();
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.js.map
