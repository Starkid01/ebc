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
var MyLoader = (function () {
    function MyLoader() {
    }
    __decorate([
        core_1.Input('value'),
        __metadata('design:type', Number)
    ], MyLoader.prototype, "upload", void 0);
    MyLoader = __decorate([
        core_1.Component({
            selector: 'up-loader',
            directives: [ionic_angular_1.IONIC_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None,
            template: "<div class=\"drop\">\n\t<div class=\"loadBg\">\n\t\t<ion-spinner name=\"crescent\"></ion-spinner>\n          <progress [value]=\"upload\" max=\"100\"></progress>\n\t\t<div>Uploading...{{upload}}%</div>\n\t</div>\n  </div>",
            styles: ["\n    .drop {\n      position: absolute;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      top: 0;\n      left: 0;\n      width: 100vw;\n      height: 100vh;\n      background: rgba(12, 12, 12, 0.3);\n      z-index: 999;\n    }\n    .drop progress {\n      width: 85%;\n      margin-bottom: 1rem;\n      margin-top: 1rem;\n      border-radius: 2rem;\n      border: 0;\n    }\n    .drop progress::-webkit-progress-bar {\n      background-color: rgba(153, 153, 153, 0.1);\n      border-radius: 1rem;\n    }\n    .drop progress[value] {\n      color: #703869;\n    }\n    .drop progress[value]::-webkit-progress-value {\n      background-color: #703869;\n      border-radius: 1rem;\n    }\n    .drop circle {\n      stroke: #11c1f3;\n    }\n    .drop .loadBg {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      background: #fafafa;\n      width: 20rem;\n      height: 11rem;\n      border-radius: .25rem;\n      box-shadow: 0.1rem 0.1rem 1rem rgba(11, 11, 11, 0.3);\n    }\n  "]
        }),
        __metadata('design:paramtypes', [])
    ], MyLoader);
    return MyLoader;
})();
exports.MyLoader = MyLoader;
//# sourceMappingURL=myloader.js.map
