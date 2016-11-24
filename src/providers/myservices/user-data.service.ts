import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { BackandAuthService, BackandUser } from '../backand';

@Injectable()
export class UserService {
  myUser: BackandUser;

  constructor(public events: Events, public auth: BackandAuthService) {

  }

  getUser() {
    this.auth.currentUser().subscribe(
      data => {
        let user = data[0];
        this.setUser(user);
      });
  }

  setUser(user) {
    this.events.publish('myUser', user);
  }

  userData() {
    this.events.subscribe('myUser', (user) => {
      this.myUser = user[0];
      console.log(user);
    });
  }
}
