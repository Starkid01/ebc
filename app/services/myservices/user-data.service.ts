import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { BackandService } from '../backand';

@Injectable()
export class UserService {
  myUser: Object;

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
        let errorMessage = this.backand.extractErrorMessage(err);
        this.backand.authStatus = `Error: ${errorMessage}`;
        this.backand.logError(err);
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
