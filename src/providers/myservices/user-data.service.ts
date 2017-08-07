import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Events } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

import { BackandUser } from '../backand';

@Injectable()
export class UserService {
  myUser: BackandUser;

  constructor(public backand: BackandService, public events: Events, public http: HttpClient) { }

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
      device: this.myUser.email,
      token: token
    };
    this.backand.object.create('equipment', deviceData)
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
}
