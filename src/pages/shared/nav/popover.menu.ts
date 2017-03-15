import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BackandService } from '@backand/angular2-sdk';
import { App, ModalController, ViewController } from 'ionic-angular';

import { LoginPage } from '../../login';
import { PrivatePolicyPage } from '../../private-policy';

@Component({
  template: `
    <ion-list no-lines>
      <button ion-item (click)="privacy()">
        <span>Privacy Policy <ion-icon name="list-box"></ion-icon></span>
      </button>
      <button ion-item (click)="signOut()">
        <span ion-text color="danger">Sign Out <ion-icon name="log-out"></ion-icon></span>
      </button>
    </ion-list>
  `
})

export class PopoverMenu {

  constructor(
    private app: App,
    private backand: BackandService,
    private modal: ModalController,
    private storage: Storage,
    private view: ViewController) { }
  
  privacy() {
    let polly = this.modal.create(PrivatePolicyPage);
    polly.present();
    this.view.dismiss();
  }

  signOut() {
    let nav = this.app.getRootNav();

    this.backand.signout();
    this.view.dismiss();
    this.storage.clear();
    nav.setRoot(LoginPage);
  }
}
