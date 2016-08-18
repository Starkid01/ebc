import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ToastController, Platform, ActionSheetController, App } from 'ionic-angular';
import { Camera, File, Transfer } from 'ionic-native';
import 'rxjs';

@Injectable()
export class PictureService {
  newPic: boolean = false;
  picFile: string;
  myLoader: boolean = false;
  myProg: number = 0;
  nav: any;

  constructor(public app: App, public toast: ToastController, public action: ActionSheetController, public http: Http) {

  }

  failed = (err: any) => {
    let code = err.code;
    console.log(code, err);
  }

  getPics() {
    let actionPics = this.action.create({
      title: 'Get Pictures',
      buttons: [
        {
          text: 'Take Picture',
          icon: 'camera',
          handler: () => {
            this.removeFile();
            let opts = {
              destinationType: 1,
              quality: 100,
              sourceType: 1,
              allowEdit: true
            };
            Camera.getPicture(opts).then((imageData) => {
              this.picFile = imageData;
              this.newPic = true;
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
            this.removeFile();
            let opts = {
              destinationType: 1,
              quality: 100,
              sourceType: 2,
              allowEdit: true
            };
            Camera.getPicture(opts).then((imageData) => {
              this.picFile = imageData;
              this.newPic = true;
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
    actionPics.present();
  }

  getSigned(preset: string, user: Object) {
    let opt = JSON.stringify({
      preset: preset,
      tag: `${user['firstName']} ${user['lastName']}`
    });
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://ebc.beezleeart.com/upload/cloudinary_call.php', opt, {
      headers: header
    }).map(res => res);
  }

  upload(signed: Object, onSuccess: any) {
    this.newPic = false;
    this.myLoader = true;
    let ft = new Transfer();
    let filename = this.picFile.substring(this.picFile.lastIndexOf('/') + 1);
    let url = 'https://api.cloudinary.com/v1_1/ebccloud/image/upload';
    let options = {
      fileKey: 'file',
      fileName: filename,
      mimeType: 'image/jpeg',
      hunkedMode: false,
      headers: {
        'Content-Type': undefined
      },
      params: signed
    };
    ft.onProgress(this.progress);
    ft.upload(this.picFile, url, options)
      .then(result => {
        onSuccess(result);
      })
      .catch(error => {
        this.failed(error);
      });
  }

  picSaved() {
    let myImg = this.toast.create({
      message: 'Your Profile Pic has been Saved',
      duration: 2000
    });
    myImg.onDidDismiss(() => {
      this.myLoader = false;
    });
    myImg.present();
  }

  progress = (prog: ProgressEvent) => {
    this.myProg = Math.round((prog.loaded / prog.total) * 100);
    console.log(this.myProg);
  }

  removeFile() {
    if (this.picFile) {
      let dir = this.picFile.substring(0, this.picFile.lastIndexOf('/'));
      let file = this.picFile.substring(this.picFile.lastIndexOf('/') + 1);
      File.removeFile(dir, file).then(
        value => console.log(value),
        err => console.log(err));
      console.log(this.picFile);
      this.picFile = null;
    }
  }
}
