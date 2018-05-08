import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActionSheetController, App, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

import 'rxjs';

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

  getSigned(preset: string, user: Object) {
    let opt = JSON.stringify({
      preset: preset,
      tag: `${user['displayName']}`
    });
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(`${this.myApi}/upload/cloudinary_call.php`, opt, { headers: header });
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
      this.picFile = `data:image/png;base64,${imageData}`;
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

  upload(signed: Object, successUpload: Function) {
    this.newPic = false;
    this.uploading();
    let url = 'https://api.cloudinary.com/v1_1/ebccloud/image/upload';
    signed['file'] = this.picFile;
    this.http.request('POST', url, { body: signed, reportProgress: true })
      .subscribe(res => {
        console.log(res);
        successUpload(res['url']);
        this.picSaved();
      },
      err => console.log(err));
  }

  uploading() {
    this.myLoader = this.loader.create({
      content: 'Uploading File...'
    });

    this.myLoader.present();
  }
}
