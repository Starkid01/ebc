import { Component, Type } from '@angular/core';
import { App, LocalStorage, Storage, ViewController } from 'ionic-angular';

import { LoginPage } from '../../login';

@Component({
  template: `
    <ion-list no-lines>
      <button ion-item (click)="signOut()"><span danger>Sign Out <ion-icon name="log-out"></ion-icon></span></button>
    </ion-list>
  `
})

export class PopoverMenu {
  local: Storage = new Storage(LocalStorage);

  constructor(private app: App, private view: ViewController) {
  }

  signOut() {
    let nav = this.app.getRootNav();
    this.view.dismiss();
    this.local.clear();
    nav.setRoot(LoginPage);
  }
}
