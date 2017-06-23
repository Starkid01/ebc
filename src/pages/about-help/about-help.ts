import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AlertController, IonicPage, ModalController } from 'ionic-angular';

@IonicPage({
  name: 'about-help'
})
@Component({
  selector: 'page-about-help',
  templateUrl: 'about-help.html'
})
export class AboutHelpPage implements OnInit {
  appName: string = 'EBC';
  appVer: string = '2.1.0';
  appVerCode: number = 20100;

  constructor(private alert: AlertController, private appVersion: AppVersion,
    private modal: ModalController, private social: SocialSharing) { }

  ngOnInit() {
    this.getApp();
    this.getVer();
    this.getCode();
  }

  getApp() {
    this.appVersion.getAppName()
      .then(res => this.appName = res)
      .catch(err => console.log(err));
  }

  getCode() {
    this.appVersion.getVersionCode()
      .then(res => this.appVerCode = res)
      .catch(err => console.log(err));
  }

  getVer() {
    this.appVersion.getVersionNumber()
      .then(res => this.appVer = res)
      .catch(err => console.log(err));
  }

  helpEmail() {
    let email = ['ebc.support@ebc.beezleeart.com'];

    let emailAlert = this.alert.create({
      title: 'Feedback/Help Email',
      inputs: [
        {
          name: 'subject',
          placeholder: 'Subject'
        },
        {
          name: 'message',
          placeholder: 'Brief Message'
        }
      ],
      buttons: [
        {
          cssClass: 'cancel',
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Send',
          handler: data => {
            this.social.shareViaEmail(data['message'], data['subject'], email)
             .then(res => {

             })
             .catch(err => {

             });
          }
        }
      ]
    });

    emailAlert.present();
  }

  policy() {
    let legal = this.modal.create('private-policy');
    legal.present();
  }
}
