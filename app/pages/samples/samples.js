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
var core_1 = require('@angular/core');
var moremenu_1 = require('../moremenu/moremenu');
var services_1 = require('../../components/services/services');
var scards_1 = require('../scards/scards');
var sflyers_1 = require('../sflyers/sflyers');
var Samples = (function () {
    function Samples(services) {
        this.services = services;
        this.cardTab = scards_1.SCardsPage;
        this.flyerTab = sflyers_1.SFlysPage;
    }
    Samples.prototype.getTitle = function (Type) {
        var tab = Type;
        if (tab == scards_1.SCardsPage) {
            this.title = 'Sample Cards';
        }
        if (tab == sflyers_1.SFlysPage) {
            this.title = 'Sample Flyers';
        }
    };
    __decorate([
        core_1.ViewChild(moremenu_1.MoreMenu),
        __metadata('design:type', moremenu_1.MoreMenu)
    ], Samples.prototype, "more", void 0);
    Samples = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/samples/samples.html',
            directives: [moremenu_1.MoreMenu]
        }),
        __metadata('design:paramtypes', [services_1.Services])
    ], Samples);
    return Samples;
})();
exports.Samples = Samples;
//# sourceMappingURL=samples.js.map
