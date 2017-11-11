import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { ActionSheetController, App, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

import 'rxjs';

@Injectable()
export class PictureService {
  newPic: boolean = false;
  picFile: string = '';
  myLoader: Loading;
  myProg: number = 0;

  constructor(public app: App, public camera: Camera, public toast: ToastController, public action: ActionSheetController,
    public file: File, public http: Http, public httpUpload: HttpClient, public loader: LoadingController) { }

  copyFile(imagePath: string) {
    let newName = `${this.randomName(10)}.jpg`;
    let path = imagePath.substring(0, imagePath.lastIndexOf('/'));
    let file = imagePath.substring(imagePath.lastIndexOf('/') + 1);
    this.file.copyFile(path, file, path, newName).then(
      value => {
        this.picFile = value['nativeURL'];
        this.removeFile(imagePath);
      },
      err => console.log(err));
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
            let opts: CameraOptions = {
              destinationType: 1,
              quality: 100,
              sourceType: 1,
              allowEdit: true,
              saveToPhotoAlbum: true
            };
            this.camera.getPicture(opts).then((imageData) => {
              this.newPic = true;
              this.copyFile(imageData);
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
            let opts: CameraOptions = {
              destinationType: 1,
              quality: 100,
              sourceType: 2,
              saveToPhotoAlbum: true,
              allowEdit: true
            };
            this.camera.getPicture(opts).then((imageData) => {
              this.newPic = true;
              this.copyFile(imageData);
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
    return this.http.post('https://ebc.beezleeart.com/upload/cloudinary_call.php', opt, {
      headers: header
    }).map(res => res);
  }

  picSaved() {
    let myImg = this.toast.create({
      message: 'Your Profile Pic has been Saved',
      position: 'top',
      duration: 2000
    });
    myImg.onDidDismiss(() => {
      this.myLoader.dismiss();
    });
    myImg.present();
  }

  progress = (prog: ProgressEvent) => {
    let p = Math.round((prog.loaded / prog.total) * 100);
    let timer;

    if (p < 100) {
      timer = setInterval(() => this.myProg = p, 1);
    } else {
      timer.clearTimeout();
    }
  }

  upload(signed: Object, onSuccess: any) {
    this.newPic = false;
    this.uploading();
    let filename = this.picFile.substring(this.picFile.lastIndexOf('/') + 1);
    let url = 'https://api.cloudinary.com/v1_1/ebccloud/image/upload';
    let data = {
      file: filename,
      params: signed
    }

    this.httpUpload.post(url, data, { reportProgress: true })
      .subscribe(res => {
        console.log(res);
      },
      err => console.log(err))
  }

  uploading() {
    this.myLoader = this.loader.create({
      content: 'Uploading File...'
    });

    this.myLoader.present();
  }

  randomName(x: number) {
    let s = '';
    while (s.length < x && x > 0) {
      let r = Math.random();
      s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    return s;
  }

  removeFile(imgFile: string) {
    let path = imgFile.substring(0, imgFile.lastIndexOf('/'));
    let file = imgFile.substring(imgFile.lastIndexOf('/') + 1);
    this.file.removeFile(path, file).then(
      value => console.log(value),
      err => console.log(err));
  }
}
