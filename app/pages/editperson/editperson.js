var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var common_1 = require('angular2/common');
var ionic_angular_1 = require('ionic-angular');
var moremenu_1 = require('../moremenu/moremenu');
var backand_1 = require('../../components/backand/backand');
var services_1 = require('../../components/services/services');
var EditPage = (function () {
    function EditPage(backand, services) {
        this.backand = backand;
        this.services = services;
        this.section = 'user';
        this.oldPass = new common_1.Control('', common_1.Validators.required);
        this.password = new common_1.Control('', common_1.Validators.required);
        this.confirm = new common_1.Control('', common_1.Validators.required);
        this.firstName = new common_1.Control('');
        this.lastName = new common_1.Control('');
        this.services.getAuth();
        this.services.getUser();
        this.editForm = new common_1.ControlGroup({
            firstName: this.firstName,
            lastName: this.lastName
        });
        this.verify = new common_1.ControlGroup({
            password: this.password,
            confirm: this.confirm
        }, {}, services.areEqual);
        this.passwordForm = new common_1.ControlGroup({
            oldPass: this.oldPass,
            verify: this.verify
        });
    }
    EditPage.prototype.editPass = function (pass) {
        var _this = this;
        var newPass = {
            oldPassword: pass.value.oldPass,
            newPassword: pass.value.verify.password
        };
        this.backand.updatePass(newPass).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
            _this.services.clearForm(pass.controls.verify);
            _this.services.clearField(pass.controls.oldPass);
        }, function () {
            console.log('Password Changed');
            _this.services.clearForm(pass.controls.verify);
            _this.services.clearField(pass.controls.oldPass);
        });
    };
    EditPage.prototype.editInfo = function (info) {
        var _this = this;
        var name = 'users';
        var id = this.services.myUser['id'];
        var input = info.value;
        for (var i in input) {
            if (input[i] === '') {
                delete input[i];
                this.backand.updateItem(name, id, input).subscribe(function (data) {
                    console.log(data);
                }, function (err) {
                    console.log(err);
                    _this.services.clearForm(info);
                }, function () {
                    console.log('Info has Changed');
                    _this.services.clearForm(info);
                    _this.services.getUser();
                });
            }
        }
    };
    EditPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/editperson/editperson.html',
            providers: [backand_1.Backand, services_1.Services],
            directives: [common_1.FORM_DIRECTIVES, moremenu_1.MoreMenu]
        }),
        __metadata('design:paramtypes', [backand_1.Backand, services_1.Services])
    ], EditPage);
    return EditPage;
})();
exports.EditPage = EditPage;
//# sourceMappingURL=editperson.js.map
