var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var ionic_angular_1 = require('ionic-angular');
var login_1 = require('../login/login');
var dropmenu_1 = require('../../components/dropmenu/dropmenu');
var MoreMenu = (function () {
    function MoreMenu(nav) {
        this.nav = nav;
        this.visibleChange = new core_1.EventEmitter();
        this.login = login_1.LoginPage;
        this.local = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
        this.nav = nav;
        this.local;
    }
    MoreMenu.prototype.ngOnChanges = function (c) {
        var ch = c;
        for (var i in ch) {
            this.show = ch[i].currentValue;
        }
    };
    MoreMenu.prototype.myToggle = function (h) {
        this.show = h;
        this.visibleChange.emit(h);
    };
    MoreMenu.prototype.signOut = function () {
        var nav = this.nav;
        this.local.remove('jwt');
        nav.rootNav.setRoot(login_1.LoginPage);
    };
    __decorate([
        core_1.Input(),
        __metadata('design:type', Boolean)
    ], MoreMenu.prototype, "visible", void 0);
    __decorate([
        core_1.Output('more'),
        __metadata('design:type', core_1.EventEmitter)
    ], MoreMenu.prototype, "visibleChange", void 0);
    MoreMenu = __decorate([
        core_1.Component({
            selector: 'more-menu',
            templateUrl: 'build/pages/moremenu/moremenu.html',
            directives: [dropmenu_1.DropMenu, dropmenu_1.MenuItem]
        }),
        __metadata('design:paramtypes', [ionic_angular_1.NavController])
    ], MoreMenu);
    return MoreMenu;
})();
exports.MoreMenu = MoreMenu;
//# sourceMappingURL=moremenu.js.map
