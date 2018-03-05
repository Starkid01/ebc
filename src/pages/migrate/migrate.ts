import { Component } from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'migrate',
  segment: 'migrage'
})
@Component({
  selector: 'page-migrate',
  templateUrl: 'migrate.html',
})
export class MigratePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private appPreferences: AppPreferences) { }

  gotoLogin() {
    this.appPreferences.store('ebc', 'message', true);
    this.navCtrl.setRoot('login');
  }
}
