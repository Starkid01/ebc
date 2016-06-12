declare var FileUploadOptions:any;
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Toast, Platform, ActionSheet, App } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Injectable()
export class PictureService {
  newPic:boolean = false;
  picFile:string;
  myLoader:boolean = false;
  myProg:number;
  nav:any;

  constructor(public app:App, public http:Http) {

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

  getSigned(preset:string, user:Object) {
    let opt = JSON.stringify({
      preset: preset,
      tag: user['firstName'] + ' ' + user['lastName']
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
}
