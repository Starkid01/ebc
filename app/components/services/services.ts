import {LocalStorage, Toast, Platform, Storage, ActionSheet, Events, IonicApp} from 'ionic-angular';
import {Validators, ControlGroup, Control} from 'angular2/common';
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Camera} from 'ionic-native';
import {Backand} from '../../components/backand/backand';


@Injectable()
export class Services {
  local:Storage = new Storage(LocalStorage);
  myUser:Object;
  hide:boolean = true;
  newPic:boolean = false;
  picFile:string;
  myLoader:boolean = false;
  myProg:number;
  nav:any;

constructor(public app: IonicApp, public backand:Backand, public http:Http, public events:Events) {
    this.http = http;
  }

  getPics() {
    let actionPics = ActionSheet.create({
      title: 'Get Pictures',
      buttons: [
        {
          text: 'Take Picture',
          icon: 'camera',
          handler: () => {
            let opts = {
              quality: 100,
              allowEdit: true
            }
            Camera.getPicture(opts).then((imageData) => {
              this.picFile = imageData;
              this.newPic = true;
              this.picFile;
            }, (err) => {
              console.log(err);
            });
            console.log('Camera Open');
          }
        },
        {
          text: 'Get Picture',
          icon: 'images',
          handler: () => {
            let opts = {
              quality: 100,
              sourceType: 0,
              allowEdit: true
            }
            Camera.getPicture(opts).then((imageData) => {
              this.picFile = imageData;
              this.newPic = true;
              this.picFile;
            }, (err) => {
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
          handler: () => {
            console.log('Cancel');
          }
        },
      ]
    });
    this.nav = this.app.getActiveNav();
    this.nav.present(actionPics);
  }

  getSigned(preset:string) {
    let opt = JSON.stringify({
      preset: preset,
      tag: this.myUser['firstName'] + ' ' + this.myUser['lastName']
    });
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://ebc.beezleeart.com/upload/cloudinary_call.php', opt, {
      headers: header
      }).map(res => res)
  }

  upload(signed:Object, onSuccess:any) {
    let ft = new FileTransfer();
    let options = new FileUploadOptions();
    let filename = this.picFile.substring(this.picFile.lastIndexOf('/')+1);
    let url = 'https://api.cloudinary.com/v1_1/ebccloud/image/upload';

    options.fileKey = 'file';
    options.fileName = filename;
    options.mimeType = 'image/jpeg';
    options.chunkedMode = false;
    options.headers = {
        'Content-Type' : undefined
    }
    options.params = signed;

    ft.onprogress = (e:ProgressEvent) => this.progress(e);
    ft.upload(this.picFile, url, onSuccess, this.failed, options);
  }

  progress = (prog:ProgressEvent) => {
    this.myLoader = true;
    this.myProg = Math.round((prog.loaded / prog.total) * 100);
    console.log(this.myProg);
  }

  failed = (err:any) => {
    let code = err.code;
    console.log(code, err);
  }

  setUser(user) {
    this.events.publish('myUser', user);
  }

  userData() {
    this.events.subscribe('myUser', (user) => {
      this.myUser = user[0];
      console.log(user);
    })
  }

  getUser(){
    this.backand.currentUser().subscribe(
      data => {
        this.backand.auth_status = 'OK';
        //this.myUser = data[0];
        let user = data[0];
        this.setUser(user);
      },
      err => {
        let errorMessage = this.backand.extractErrorMessage(err);
        this.backand.auth_status = `Error: ${errorMessage}`;
        this.backand.logError(err);
      });
  }

  getAuth(){
    let auth = this.local.get('jwt')['__zone_symbol__value'];
    this.backand.setTokenHeader(auth);
  }

  areEqual(g: Control) {
    let equal = g.value;
    const vals = Object.keys(equal).map(key => equal[key]);
    if(vals[0] != vals[1]){
      return {notEqual: true};
    }
    else{
      return null;
    }
  }

  emailValidator(c: Control) {
    if (!c.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return { 'invalidEmailAddress': true };

    } else {
      return null;
    }
  }

  clearField(c: Control) {
    let field = c;

    field.updateValue('');
    field.updateValueAndValidity();
    field.setErrors(null);
    //field._pristine = true;
  }

  clearForm(g: ControlGroup){
    let form = g;

    for(let i in g.controls){
      let input = <Control>g.find(i);
      input.updateValue('');
      input.updateValueAndValidity();
      //input._pristine = true;
    }
  }

  more(){
    this.hide = !this.hide;
  }

  hideMore(){
    this.hide = true;
  }
}
