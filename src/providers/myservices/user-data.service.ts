import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

import { BackandUser } from '../backand';

@Injectable()
export class UserService {
  myUser: BackandUser;

  constructor(public events: Events, public backand: BackandService) {

  }

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

  setUser(user) {
    this.events.publish('myUser', user);
  }

  userData() {
    this.events.subscribe('myUser', (user) => {
      this.myUser = user;
      console.log(user);
    });
  }
}
