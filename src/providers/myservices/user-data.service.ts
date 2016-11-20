import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { BackandService } from '../backand';

interface EbcUser {
  firstName?: string;
  lastName?: string;
  pic?: string;
}

@Injectable()
export class UserService {
  myUser: EbcUser;

  constructor(public events: Events, public backand: BackandService) {

  }

  getUser() {
    this.backand.currentUser().subscribe(
      data => {
        this.backand.authStatus = 'OK';
        let user = data[0];
        this.setUser(user);
      },
      err => {
        this.backand.errorHander(err);
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
