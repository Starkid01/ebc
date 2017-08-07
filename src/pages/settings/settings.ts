import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Events, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage({
  name: 'settings'
})
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {
  notify: FormControl = new FormControl('');
  noChange: boolean = true;
  settings: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private events: Events, private storage: Storage, private toast: ToastController) { }

  ngOnInit() {
    this.settings = new FormGroup({
      notifications: this.notify
    });
  }
 
  getNotify() {
    this.storage.get('notify')
      .then(setting => this.notify.setValue(setting))
      .catch(err => console.log(err));
  }

  getSettings() {
    this.getNotify();
  }

  setNotify() {
    this.storage.set('notify', this.notify.value);
    this.events.publish('notify', this.notify);
  }

  setSettings() {
    this.setNotify();
    console.log('saved')

    this.settingsSaved();
  }

  ionViewDidEnter() {
    this.formChanges();
  }

   ionViewWillEnter() {
    this.getSettings();
  }

  ionViewWillLeave() {
    this.formChanges().unsubscribe();
  }

  settingsSaved() {
    let saved = this.toast.create({
      message: 'Your Settings have been Saved',
      duration: 5000,
    });

    saved.present();
  }

  private formChanges() {
    return this.settings.valueChanges
      .subscribe(data => {
        console.log(data);
        this.noChange = false;
      },
      err => console.log(err));
  }
}
