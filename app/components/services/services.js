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
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var ionic_native_1 = require('ionic-native');
var backand_1 = require('../../components/backand/backand');
var Services = (function () {
    function Services(app, backand, http, events) {
        var _this = this;
        this.app = app;
        this.backand = backand;
        this.http = http;
        this.events = events;
        this.local = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
        this.hide = true;
        this.newPic = false;
        this.myLoader = false;
        this.progress = function (prog) {
            _this.myLoader = true;
            _this.myProg = Math.round((prog.loaded / prog.total) * 100);
            console.log(_this.myProg);
        };
        this.failed = function (err) {
            var code = err.code;
            console.log(code, err);
        };
        this.http = http;
    }
    Services.prototype.getPics = function () {
        var _this = this;
        var actionPics = ionic_angular_1.ActionSheet.create({
            title: 'Get Pictures',
            buttons: [
                {
                    text: 'Take Picture',
                    icon: 'camera',
                    handler: function () {
                        var opts = {
                            quality: 100,
                            allowEdit: true
                        };
                        ionic_native_1.Camera.getPicture(opts).then(function (imageData) {
                            _this.picFile = imageData;
                            _this.newPic = true;
                            _this.picFile;
                        }, function (err) {
                            console.log(err);
                        });
                        console.log('Camera Open');
                    }
                },
                {
                    text: 'Get Picture',
                    icon: 'images',
                    handler: function () {
                        var opts = {
                            quality: 100,
                            sourceType: 0,
                            allowEdit: true
                        };
                        ionic_native_1.Camera.getPicture(opts).then(function (imageData) {
                            _this.picFile = imageData;
                            _this.newPic = true;
                            _this.picFile;
                        }, function (err) {
                            console.log(err);
                        });
                        console.log('Gallery Open');
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close-circle',
                    role: 'cancel',
                    cssClass: 'cancel',
                    handler: function () {
                        console.log('Cancel');
                    }
                },
            ]
        });
        this.nav = this.app.getActiveNav();
        this.nav.present(actionPics);
    };
    Services.prototype.getSigned = function (preset) {
        var opt = JSON.stringify({
            preset: preset,
            tag: this.myUser['firstName'] + ' ' + this.myUser['lastName']
        });
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post('http://ebc.beezleeart.com/upload/cloudinary_call.php', opt, {
            headers: header
        }).map(function (res) { return res; });
    };
    Services.prototype.upload = function (signed, onSuccess) {
        var _this = this;
        var ft = new FileTransfer();
        var options = new FileUploadOptions();
        var filename = this.picFile.substring(this.picFile.lastIndexOf('/') + 1);
        var url = 'https://api.cloudinary.com/v1_1/ebccloud/image/upload';
        options.fileKey = 'file';
        options.fileName = filename;
        options.mimeType = 'image/jpeg';
        options.chunkedMode = false;
        options.headers = {
            'Content-Type': undefined
        };
        options.params = signed;
        ft.onprogress = function (e) { return _this.progress(e); };
        ft.upload(this.picFile, url, onSuccess, this.failed, options);
    };
    Services.prototype.setUser = function (user) {
        this.events.publish('myUser', user);
    };
    Services.prototype.userData = function () {
        var _this = this;
        this.events.subscribe('myUser', function (user) {
            _this.myUser = user[0];
            console.log(user);
        });
    };
    Services.prototype.getUser = function () {
        var _this = this;
        this.backand.currentUser().subscribe(function (data) {
            _this.backand.auth_status = 'OK';
            //this.myUser = data[0];
            var user = data[0];
            _this.setUser(user);
        }, function (err) {
            var errorMessage = _this.backand.extractErrorMessage(err);
            _this.backand.auth_status = "Error: " + errorMessage;
            _this.backand.logError(err);
        });
    };
    Services.prototype.getAuth = function () {
        var auth = this.local.get('jwt')['__zone_symbol__value'];
        this.backand.setTokenHeader(auth);
    };
    Services.prototype.areEqual = function (g) {
        var equal = g.value;
        var vals = Object.keys(equal).map(function (key) { return equal[key]; });
        if (vals[0] != vals[1]) {
            return { notEqual: true };
        }
        else {
            return null;
        }
    };
    Services.prototype.emailValidator = function (c) {
        if (!c.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return { 'invalidEmailAddress': true };
        }
        else {
            return null;
        }
    };
    Services.prototype.clearField = function (c) {
        var field = c;
        field.updateValue('');
        field.updateValueAndValidity();
        field.setErrors(null);
        //field._pristine = true;
    };
    Services.prototype.clearForm = function (g) {
        var form = g;
        for (var i in g.controls) {
            var input = g.find(i);
            input.updateValue('');
            input.updateValueAndValidity();
        }
    };
    Services = __decorate([
        core_1.Injectable(),
        __metadata('design:paramtypes', [ionic_angular_1.IonicApp, backand_1.Backand, http_1.Http, ionic_angular_1.Events])
    ], Services);
    return Services;
})();
exports.Services = Services;
//# sourceMappingURL=services.js.map
