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
var backand_1 = require('../../components/backand/backand');
var services_1 = require('../../components/services/services');
var moremenu_1 = require('../moremenu/moremenu');
var editperson_1 = require('../editperson/editperson');
var PersonPage = (function () {
    function PersonPage(nav, backand, services) {
        this.nav = nav;
        this.backand = backand;
        this.services = services;
        this.edit = editperson_1.EditPage;
    }
    PersonPage.prototype.editInfo = function () {
        this.nav.push(this.edit);
    };
    __decorate([
        core_1.ViewChild(moremenu_1.MoreMenu),
        __metadata('design:type', moremenu_1.MoreMenu)
    ], PersonPage.prototype, "more", void 0);
    PersonPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/myperson/myperson.html',
            directives: [moremenu_1.MoreMenu]
        }),
        __metadata('design:paramtypes', [ionic_angular_1.NavController, backand_1.Backand, services_1.Services])
    ], PersonPage);
    return PersonPage;
})();
exports.PersonPage = PersonPage;
//# sourceMappingURL=myperson.js.map
