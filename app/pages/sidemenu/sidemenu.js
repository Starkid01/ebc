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
var mystuff_1 = require('../mystuff/mystuff');
var samples_1 = require('../samples/samples');
var myperson_1 = require('../myperson/myperson');
var backand_1 = require('../../components/backand/backand');
var services_1 = require('../../components/services/services');
var SideMenu = (function () {
    function SideMenu(app, backand, services) {
        this.app = app;
        this.backand = backand;
        this.services = services;
        this.homePage = mystuff_1.MyStuff;
        this.services.getUser();
        this.pages = [
            { title: 'EBC Samples', component: samples_1.Samples },
            { title: 'My Stuff', component: mystuff_1.MyStuff },
            { title: 'My Profile', component: myperson_1.PersonPage }
        ];
    }
    ;
    SideMenu.prototype.toPages = function (page) {
        this.homePage = page.component;
    };
    SideMenu = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/sidemenu/sidemenu.html'
        }),
        __metadata('design:paramtypes', [ionic_angular_1.IonicApp, backand_1.Backand, services_1.Services])
    ], SideMenu);
    return SideMenu;
})();
exports.SideMenu = SideMenu;
//# sourceMappingURL=sidemenu.js.map
