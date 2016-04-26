import {LocalStorage, Platform, Storage, NavController, ActionSheet} from 'ionic-angular';
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

  constructor(public backand:Backand, public nav:NavController, public http:Http) {
    this.nav = nav;
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
              return this.picFile;
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
              //return
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

  upload(tags:string) {
    this.getSigned(tags);

  }

  getUser(){
    this.backand.currentUser().subscribe(
      data => {
        this.backand.auth_status = 'OK';
        this.myUser = data[0];
      },
      err => {
        var errorMessage = this.backand.extractErrorMessage(err);
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
