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
var backand_1 = require('./components/backand/backand');
var services_1 = require('./components/services/services');
var login_1 = require('./pages/login/login');
// https://angular.io/docs/ts/latest/api/core/Type-interface.html
var core_1 = require('@angular/core');
var MyApp = (function () {
    function MyApp(platform, events, backand, services) {
        this.platform = platform;
        this.events = events;
        this.backand = backand;
        this.services = services;
        this.rootPage = login_1.LoginPage;
        platform.ready().then(function () {
            // The platform is now ready. Note: if this callback fails to fire, follow
            // the Troubleshooting guide for a number of possible solutions:
            //
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //
            // First, let's hide the keyboard accessory bar (only works natively) since
            // that's a better default:
            //
            // Keyboard.setAccessoryBarVisible(false);
            //
            // For example, we might change the StatusBar color. This one below is
            // good for dark backgrounds and light text:
            // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
        });
        this.myEvents();
    }
    MyApp.prototype.myEvents = function () {
        var _this = this;
        this.events.subscribe('myUser', function (user) {
            _this.services.myUser = user[0];
        });
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav),
        __metadata('design:type', ionic_angular_1.Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        ionic_angular_1.App({
            template: '<ion-nav id="nav" [root]="rootPage"></ion-nav>',
            providers: [backand_1.Backand, services_1.Services],
            config: {
                mode: 'md',
                scrollAssist: false
            } // http://ionicframework.com/docs/v2/api/config/Config/
        }),
        __metadata('design:paramtypes', [ionic_angular_1.Platform, ionic_angular_1.Events, backand_1.Backand, services_1.Services])
    ], MyApp);
    return MyApp;
})();
exports.MyApp = MyApp;
//# sourceMappingURL=app.js.map
