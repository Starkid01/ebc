import { Component } from '@angular/core';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  gotoLogin() {
    this.navCtrl.setRoot('login');
  }
}
