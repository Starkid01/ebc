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
var ionic_native_1 = require('ionic-native');
var moremenu_1 = require('../moremenu/moremenu');
var backand_1 = require('../../components/backand/backand');
var services_1 = require('../../components/services/services');
var DetailPage = (function () {
    function DetailPage(backand, services, params) {
        this.backand = backand;
        this.services = services;
        this.params = params;
        this.phone = new common_1.Control('');
        this.text = new common_1.Control('');
        this.email = new common_1.Control('', this.services.emailValidator);
        this.hide = false;
        this.message = '';
        this.pickPhone = '';
        this.params = params;
        this.itemDetail();
        this.text['_value'] = 'Something Cool';
        this.smsForm = new common_1.ControlGroup({
            phone: this.phone,
            text: this.text
        });
        this.emailForm = new common_1.ControlGroup({
            email: this.email,
            text: this.text
        });
    }
    DetailPage.prototype.itemDetail = function () {
        var _this = this;
        var obj = this.params.get('table');
        var id = this.params.get('index');
        this.backand.getItem(obj, id).subscribe(function (data) {
            _this.item = data;
        }, function (err) {
            var errorMessage = _this.backand.extractErrorMessage(err);
            _this.backand.auth_status = "Error: " + errorMessage;
            _this.backand.logError(err);
        });
    };
    DetailPage.prototype.sendSms = function (form) {
        var mySms = form.value;
        console.log(mySms);
    };
    DetailPage.prototype.sendEmail = function (form) {
        var myEmail = form.value;
        console.log(myEmail);
    };
    DetailPage.prototype.getContact = function () {
        var _this = this;
        console.log('Working at it');
        ionic_native_1.Contacts.pickContact().then(function (contact) {
            _this.picked = contact;
            _this.hide = true;
            console.log(_this.picked, _this.picked['name'], _this.picked['phoneNumbers'], _this.picked['emails']);
        });
    };
    __decorate([
        core_1.ViewChild(moremenu_1.MoreMenu),
        __metadata('design:type', moremenu_1.MoreMenu)
    ], DetailPage.prototype, "more", void 0);
    DetailPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/detail/detail.html',
            directives: [moremenu_1.MoreMenu, common_1.FORM_DIRECTIVES]
        }),
        __metadata('design:paramtypes', [backand_1.Backand, services_1.Services, ionic_angular_1.NavParams])
    ], DetailPage);
    return DetailPage;
})();
exports.DetailPage = DetailPage;
//# sourceMappingURL=detail.js.map
