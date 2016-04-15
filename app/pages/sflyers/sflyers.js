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
var detail_1 = require('../../pages/detail/detail');
var backand_1 = require('../../components/backand/backand');
var services_1 = require('../../components/services/services');
var SFlysPage = (function () {
    function SFlysPage(backand, services, nav) {
        this.backand = backand;
        this.services = services;
        this.nav = nav;
        this.detail = detail_1.DetailPage;
        this.nav = nav;
        this.services.getAuth();
        this.sampleCards();
    }
    SFlysPage.prototype.sampleCards = function () {
        var _this = this;
        var samples = 'SampleFlyer';
        this.backand.getItems(samples).subscribe(function (data) {
            console.log('Sample Flyers');
            console.log(data);
            _this.flyers = data;
        }, function (err) {
            var errorMessage = _this.backand.extractErrorMessage(err);
            _this.backand.auth_status = "Error: " + errorMessage;
            _this.backand.logError(err);
        });
    };
    SFlysPage.prototype.goTo = function (id) {
        var item = {
            index: id,
            table: 'samples'
        };
        this.nav.push(this.detail, item);
    };
    SFlysPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/sflyers/sflyers.html',
            providers: [backand_1.Backand, services_1.Services]
        }),
        __metadata('design:paramtypes', [backand_1.Backand, services_1.Services, ionic_angular_1.NavController])
    ], SFlysPage);
    return SFlysPage;
})();
exports.SFlysPage = SFlysPage;
//# sourceMappingURL=sflyers.js.map
