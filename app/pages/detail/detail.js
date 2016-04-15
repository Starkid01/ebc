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
var moremenu_1 = require('../moremenu/moremenu');
var backand_1 = require('../../components/backand/backand');
var services_1 = require('../../components/services/services');
var DetailPage = (function () {
    function DetailPage(backand, services, params) {
        this.backand = backand;
        this.services = services;
        this.params = params;
        this.hide = true;
        this.params = params;
        this.services.getAuth();
        this.itemDetail();
    }
    DetailPage.prototype.itemDetail = function () {
        var _this = this;
        var obj = this.params.get('table');
        var id = this.params.get('index');
        this.backand.getItem(obj, id).subscribe(function (data) {
            console.log('Sample Card');
            console.log(data);
            _this.item = data;
        }, function (err) {
            var errorMessage = _this.backand.extractErrorMessage(err);
            _this.backand.auth_status = "Error: " + errorMessage;
            _this.backand.logError(err);
        });
    };
    DetailPage.prototype.More = function () {
        this.hide = !this.hide;
    };
    DetailPage.prototype.HideMore = function () {
        this.hide = true;
    };
    DetailPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/detail/detail.html',
            providers: [backand_1.Backand, services_1.Services],
            directives: [moremenu_1.MoreMenu]
        }),
        __metadata('design:paramtypes', [backand_1.Backand, services_1.Services, ionic_angular_1.NavParams])
    ], DetailPage);
    return DetailPage;
})();
exports.DetailPage = DetailPage;
//# sourceMappingURL=detail.js.map
