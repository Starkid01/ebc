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
var core_1 = require('angular2/core');
var ionic_angular_1 = require('ionic-angular');
var moremenu_1 = require('../moremenu/moremenu');
var backand_1 = require('../../components/backand/backand');
var services_1 = require('../../components/services/services');
var myloader_1 = require('../../components/myloader/myloader');
var EditPage = (function () {
    function EditPage(nav, backand, services) {
        var _this = this;
        this.nav = nav;
        this.backand = backand;
        this.services = services;
        this.section = 'user';
        this.upFile = false;
        this.oldPass = new common_1.Control('', common_1.Validators.required);
        this.password = new common_1.Control('', common_1.Validators.required);
        this.confirm = new common_1.Control('', common_1.Validators.required);
        this.firstName = new common_1.Control('');
        this.lastName = new common_1.Control('');
        this.success = function (result) {
            var finish = JSON.parse(result.response);
            console.log(finish);
            var image = {
                pic: finish['url']
            };
            console.log(image);
            _this.saveUpdate(image);
            _this.picSaved();
        };
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
    EditPage.prototype.ngDoCheck = function () {
        if (this.services.newPic) {
            this.services.myUser['pic'] = this.services['picFile'];
            this.services.newPic = false;
            this.upFile = true;
        }
    };
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
    EditPage.prototype.savePic = function () {
        var _this = this;
        this.services.getSigned('usersPic')
            .subscribe(function (data) {
            _this.signed = JSON.parse(data['_body']);
        }, function (err) {
            console.log(err);
        }, function () {
            console.log(_this.signed);
            _this.services.upload(_this.signed, _this.success);
        });
    };
    EditPage.prototype.picSaved = function () {
        var _this = this;
        var myImg = ionic_angular_1.Toast.create({
            message: 'Your Profile Pic has been Saved',
            duration: 2000
        });
        myImg.onDismiss(function () {
            _this.services.myLoader = false;
            _this.upFile = false;
        });
        this.nav.present(myImg);
    };
    EditPage.prototype.saveUpdate = function (value, form) {
        var _this = this;
        var name = 'users';
        var id = this.services.myUser['id'];
        this.backand.updateItem(name, id, value).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
            if (form) {
                _this.services.clearForm(form);
            }
        }, function () {
            console.log('Info has Changed');
            _this.services.getUser();
            if (form) {
                _this.services.clearForm(form);
            }
        });
    };
    EditPage.prototype.editInfo = function (info) {
        var input = info.value;
        for (var i in input) {
            if (input[i] === '') {
                delete input[i];
                this.saveUpdate(input, info);
            }
        }
    };
    __decorate([
        core_1.ViewChild(moremenu_1.MoreMenu),
        __metadata('design:type', moremenu_1.MoreMenu)
    ], EditPage.prototype, "more", void 0);
    EditPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/editperson/editperson.html',
            directives: [common_1.FORM_DIRECTIVES, moremenu_1.MoreMenu, myloader_1.MyLoader]
        }),
        __metadata('design:paramtypes', [ionic_angular_1.NavController, backand_1.Backand, services_1.Services])
    ], EditPage);
    return EditPage;
})();
exports.EditPage = EditPage;
//# sourceMappingURL=editperson.js.map
