import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class BackandAuthService {
  authStatus: string = null;
  authType: string = 'N/A';
  isAuthError: boolean = false;

  constructor(private events: Events, private storage: Storage) { }

  authGood(res) {
    this.authStatus = res['statusText'];
    this.authType = res.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
    this.isAuthError = false;
    this.storage.set('auth', true);
    this.events.publish('login');
  }

  authErr(err) {
    this.authStatus = err['statusText'];
    this.authType = 'Fail';
    this.isAuthError = true;
    this.storage.set('auth', false);
  }
}
