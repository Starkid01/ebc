import { Component, Type } from '@angular/core';
import { Modal, NavController, LocalStorage, Storage, ViewController } from 'ionic-angular';

import { LoginPage } from '../../login';

@Component({
  template: `
    <ion-list no-lines>
      <button ion-item (click)="signOut()"><span danger>Sign Out <ion-icon name="log-out"></ion-icon></span></button>
    </ion-list>
  `
})

export class PopoverMenu {
  local:Storage = new Storage(LocalStorage);

  constructor(private nav:NavController, private view:ViewController){
  }

  signOut() {
    this.view.dismiss();
    this.local.remove('jwt');
    this.nav.rootNav.setRoot(LoginPage);
  }
}
