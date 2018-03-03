import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { App, ViewController } from 'ionic-angular';

@Component({
  template: `
    <ion-list no-lines>
      <button ion-item (click)="aboutHelp()">
        <span>About &amp; Help <ion-icon name="help-circle"></ion-icon></span>
      </button>
       <button ion-item (click)="settingPage()">
        <span>Settings <ion-icon name="settings"></ion-icon></span>
      </button>
      <button ion-item (click)="signOut()">
        <span ion-text color="danger">Sign Out <ion-icon name="log-out"></ion-icon></span>
      </button>
    </ion-list>
  `
})

export class PopoverMenu {

  constructor(private app: App, private fireAuth: AngularFireAuth, private storage: Storage, private view: ViewController) { }

  aboutHelp() {
    let nav = this.getRootNav();
    this.view.dismiss();
    nav.push('about-help');
  }

  getRootNav() {
    let appNavs = this.app.getRootNavs();
    let rootNav = appNavs.find(nav => {
      return nav ? nav['id'] === 'ebc' : null;
    });
    return rootNav;
  }

  settingPage() {
    let nav = this.getRootNav();
    this.view.dismiss();
    nav.push('settings');
  }

  signOut() {
    this.fireAuth.auth.signOut();
    this.view.dismiss();
    this.storage.clear();
  }
}
