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
var DropMenu = (function () {
    function DropMenu() {
        this.close = false;
    }
    DropMenu.prototype.ngOnInit = function () {
        this.settings = {};
        if (!this.settings.hasOwnProperty('visible')) {
            this.header = true;
        }
        if (!this.settings.hasOwnProperty('origin')) {
            Object.defineProperty(this.settings, 'origin', { value: 'top right' });
        }
    };
    DropMenu.prototype.click = function (e) {
        var click = e.target;
        var inside = false;
        var toggle = false;
        do {
            if (click === self) {
                inside = true;
            }
            if (click === document.getElementsByClassName('more')[0] || click === document.getElementsByClassName('more')[1]) {
                toggle = true;
            }
            click = click.parentNode;
        } while (click);
        if (inside) {
            this.close = false;
        }
        else if (!toggle) {
            this.close = false;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata('design:type', Object)
    ], DropMenu.prototype, "settings", void 0);
    DropMenu = __decorate([
        core_1.Component({
            selector: 'drop-menu',
            host: {
                '(document:click)': 'click($event)'
            },
            template: "<div class=\"menu enter\" *ngIf=\"close\" [style.transform-origin]=\"settings.origin\">\n      <div [hidden]=\"header\" class=\"menu-title\">{{settings.title}}</div>\n      <div class=\"menu-item\">\n        <ng-content></ng-content>\n      </div>\n    </div>",
            styles: ["\n    .menu {\n      display: flex;\n      position: absolute;\n      top: 1rem;\n      right: 2rem;\n      flex-direction: column;\n      align-item: center;\n      background: #fff;\n      min-height: 13rem;\n      min-width: 12rem;\n      width: 100%;\n      max-width: max-content;\n      box-shadow: 0px 1px 5px rgba(11, 11, 11, .3);\n      border-radius: .2em;\n      transition: all .2s ease-in-out;\n      z-index: 9999;\n    }\n    _:-ms-lang(x), .menu { max-width: 15em; }\n    .menu-title {\n      font-weight: 600;\n      text-align: center;\n      padding: 1rem;\n    }\n    @keyframes grow {\n      0% {\n        transform: scale(0);\n        opacity: 0;\n      }\n      100% {\n        transform: scale(1);\n        opacity: 1;\n      }\n    }\n    .enter {\n      animation-name: grow;\n      animation-duration: .6s;\n    }\n  "]
        }),
        __metadata('design:paramtypes', [])
    ], DropMenu);
    return DropMenu;
})();
exports.DropMenu = DropMenu;
//# sourceMappingURL=menubody.js.map
