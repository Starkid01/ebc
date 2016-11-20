import { Component, Type } from '@angular/core';
import { App, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../../login';

@Component({
  template: `
    <ion-list no-lines>
      <button ion-item (click)="signOut()"><span color="danger">Sign Out <ion-icon name="log-out"></ion-icon></span></button>
    </ion-list>
  `
})

export class PopoverMenu {

  constructor(private app: App, private storage: Storage, private view: ViewController) {
  }

  signOut() {
    let nav = this.app.getRootNav();
    this.view.dismiss();
    this.storage.clear();
    nav.setRoot(LoginPage);
  }
}
