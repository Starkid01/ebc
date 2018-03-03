import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { BackandUser } from '../backand';

@Injectable()
export class UserService {
  myApi: string = 'https://ebc.beezleeart.com';
  myUser: BackandUser;

  constructor(public events: Events, public http: HttpClient, public storage: Storage) { }

  getUser() {
    return this.storage.get('ebcUser')
      .then(user => JSON.parse(user))
      .catch(err => console.log(err))
  }

  notifyEnroll(token) {
    let deviceData = {
      token: token
    };

    this.http.post(`${this.myApi}/api/mobile/register`, deviceData)
      .subscribe(id => this.saveDev(id),
        err => console.log(err))
  }

  notifyRemove(id) {
    this.storage.get('device')
      .then(id => {
        this.http.delete(`${this.myApi}/api/obj/equipment/${id}`)
          .subscribe(data => this.removeDev())
      })
      .catch(err => console.log(err));
  }

  notifyUpdate(token) {
    this.storage.get('device')
      .then(id => this.upDev(id, token))
      .catch(err => console.log(err))
  }

  setUser(userUpdate) {
    if (userUpdate) {
      this.myUser = {
        displayName: userUpdate.displayName,
        email: userUpdate.email,
        photoUrl: userUpdate.photoURL
      }
    }
    this.storage.set('ebcUser', this.myUser);
    this.events.publish('myUser');
  }

  updateUser(newUser) {
    return this.http.post(`${this.myApi}/api/auth/update`, newUser)
      .catch((err, caught) => { console.log(err); return caught })
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
    console.log(newToken)
  }
}
