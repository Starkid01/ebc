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
var mycards_1 = require('../mycards/mycards');
var myflys_1 = require('../myflys/myflys');
var MyStuff = (function () {
    function MyStuff(services) {
        this.services = services;
        this.cardTab = mycards_1.MyCardsPage;
        this.flyerTab = myflys_1.MyFlysPage;
    }
    MyStuff.prototype.getTitle = function (Type) {
        var tab = Type;
        if (tab == mycards_1.MyCardsPage) {
            this.title = 'My Cards';
        }
        if (tab == myflys_1.MyFlysPage) {
            this.title = 'My Flyers';
        }
    };
    MyStuff = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/mystuff/mystuff.html',
            providers: [services_1.Services, backand_1.Backand],
            directives: [moremenu_1.MoreMenu]
        }),
        __metadata('design:paramtypes', [services_1.Services])
    ], MyStuff);
    return MyStuff;
})();
exports.MyStuff = MyStuff;
//# sourceMappingURL=mystuff.js.map
