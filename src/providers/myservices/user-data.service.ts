import { Injectable } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { BackandUser } from '../backand';

@Injectable()
export class UserService {
  myUser: BackandUser;

  constructor(public backand: BackandService, public events: Events, public storage: Storage) { }

  getUser() {
    this.backand.query.post('CurrentUser')
      .then(res => {
        let user = res['data'][0];
        this.setUser(user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  notifyEnroll(token) {
    let deviceData = {
      device: this.myUser.id,
      token: token
    };
    this.backand.object.create('equipment', deviceData)
      .then(dev => {
        let id = dev.data['__metadata']['id'];
        this.saveDev(id);
      })
      .catch(err => console.log(err));
  }

  notifyRemove(id) {
    this.backand.object.remove('equipment', id)
      .then(res => {
        console.log(res);
        this.removeDev();
      })
      .catch(err => console.log(err));
  }

  notifyUpdate(token) {
    this.storage.get('device')
      .then(id => this.upDev(id, token))
      .catch(err => console.log(err))
  }

  setUser(user) {
    this.myUser = user;
    this.events.publish('myUser', user);
  }

  userData() {
    this.events.subscribe('myUser', (user) => {
      this.myUser = user;
    });
  }

  private removeDev() {
    this.storage.remove('device')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  private saveDev(id) {
    this.storage.set('device', id)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  private upDev(id, data) {
    let newToken = {
      token: data
    }
    this.backand.object.update('equipment', id, newToken)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
