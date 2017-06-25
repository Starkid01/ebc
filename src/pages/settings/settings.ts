import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'settings'
})
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {
  notify: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) { }

  ngOnInit() {
    this.getSettings();
  }

  getNotify() {
    this.storage.get('notify')
    .then(setting => this.notify = setting)
    .catch(err => console.log(err));
  }

  getSettings() {
    this.getNotify();
  }

  setNotify() {
    this.storage.set('notify', this.notify)
  }

  setSettings() {
    this.setNotify();
  }
}
