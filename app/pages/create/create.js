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
var CreatePage = (function () {
    function CreatePage(nav, backand, services) {
        this.nav = nav;
        this.backand = backand;
        this.services = services;
        this.email = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, this.services.emailValidator]));
        this.firstName = new common_1.Control('', common_1.Validators.required);
        this.lastName = new common_1.Control('', common_1.Validators.required);
        this.password = new common_1.Control('', common_1.Validators.required);
        this.confirmPassword = new common_1.Control('', common_1.Validators.required);
        this.verify = new common_1.ControlGroup({
            password: this.password,
            confirmPassword: this.confirmPassword
        }, {}, services.areEqual);
        this.createForm = new common_1.ControlGroup({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            verify: this.verify
        });
    }
    CreatePage.prototype.clearAll = function () {
        this.services.clearForm(this.verify);
        this.services.clearField(this.firstName);
        this.services.clearField(this.lastName);
        this.services.clearField(this.email);
    };
    CreatePage.prototype.accountMade = function () {
        var _this = this;
        var made = ionic_angular_1.Toast.create({
            message: 'Your account has been Created Please SignIn',
            duration: 3000
        });
        made.onDismiss(function () {
            _this.nav.pop();
        });
        this.nav.present(made);
    };
    CreatePage.prototype.createUser = function (create) {
        var _this = this;
        var dets = create.value;
        var pass = dets.verify;
        var user = {
            email: dets.email,
            firstName: dets.firstName,
            lastName: dets.lastName,
            password: pass.password,
            confirmPassword: pass.confirmPassword
        };
        this.backand.signUp(user).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
            _this.createError = true;
            _this.clearAll();
        }, function () {
            console.log('User Created');
            _this.createError = false;
            _this.accountMade();
            _this.clearAll();
        });
    };
    CreatePage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/create/create.html',
            directives: [common_1.FORM_DIRECTIVES]
        }),
        __metadata('design:paramtypes', [ionic_angular_1.NavController, backand_1.Backand, services_1.Services])
    ], CreatePage);
    return CreatePage;
})();
exports.CreatePage = CreatePage;
//# sourceMappingURL=create.js.map
