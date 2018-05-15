import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActionSheetController, App, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import 'rxjs';

import { UploadImg, UploadOpts } from './ebc-types';

@Injectable()
export class PictureService {
  newPic: boolean = false;
  picFile: string = '';
  myApi: string = 'https://ebc.beezleeart.com';
  myLoader: Loading;
  myProg: number = 0;

  constructor(public app: App, public camera: Camera, public toast: ToastController, public action: ActionSheetController,
    public file: File, public http: HttpClient, public loader: LoadingController) { }

  getPics() {
    let actionPics = this.action.create({
      title: 'Get Pictures',
      buttons: [
        {
          text: 'Take Picture',
          icon: 'camera',
          handler: () => {
            this.picReturn(1);
            console.log('Camera Open');
          }
        },
        {
          text: 'Get Picture',
          icon: 'images',
          handler: () => {
            this.picReturn(2);
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

  picReturn(src: number) {
    let opts: CameraOptions = {
      allowEdit: true,
      destinationType: 0,
      quality: 100,
      sourceType: src,
      saveToPhotoAlbum: true,
      encodingType: 1
    };
    this.camera.getPicture(opts).then((imageData) => {
      this.newPic = true;
      this.picFile = `data:${this.getMimeType(imageData)};base64,${imageData}`;
    }, (err) => {
      console.log(err);
    });
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

  uploadImg(opts: UploadOpts) {
    this.newPic = false;
    let data: UploadImg = {
      img: this.picFile,
      opts: opts
    };
    this.uploading();
    console.log(data);
    return this.http.request('POST', `${this.myApi}/api/upload`, { body: data })
  }

  uploading() {
    this.myLoader = this.loader.create({
      content: 'Uploading File...'
    });

    this.myLoader.present();
  }

  private getMimeType(base64: string) {
    let startChar = base64.charAt(0);

    switch (startChar) {
      case '/':
        return 'image/jpeg';
      case 'R':
        return 'image/gif';
      case 'i':
        return 'image/png';
      default:
        return 'image/png';
    }
  }
}
