import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BackandHeader, BackandUrls } from './backand-types';

@Injectable()
export class BackandConfigService {
  apiUrl: string = 'https://api.backand.com';
  anonymousToken: string = '6755ec7e-3a7e-4dc7-a414-fd1acf8a51a1';
  appName: string = 'ebc2';
  authStatus: string = '';
  authToken: BackandHeader = { header_name: '', header_value: '' };
  authType: string;
  is_auth_error: boolean = false;
  signUpToken: string = 'dbaea0da-730d-4039-8f8a-77a507a3e908';
  urls: BackandUrls = {
    signup: '/1/user/signup',
    token: '/token',
    requestResetPassword: '/1/user/requestResetPassword',
    resetPassword: '/1/user/resetPassword',
    changePassword: '/1/user/changePassword',
    socialLoginWithCode: '/1/user/PROVIDER/code',
    socialSignupWithCode: '/1/user/PROVIDER/signupCode',
    socialLoginWithToken: '/1/user/PROVIDER/token'
  };
  username: string;

  constructor(private events: Events, private storage: Storage) { }

  authCheck() {
    this.storage.get('auth_token').then(
      token => {
        let storedToken = JSON.parse(token);

        if (storedToken) {
          this.authToken = storedToken;
          this.authType = this.authToken.header_name === 'Authorized' ? 'Token' : 'Anonymous';
          this.authStatus = 'OK';
          if (this.authType == 'Token') {
            this.storage.get('username').then(
              user => this.username = user)
          }
        } else if (storedToken === null) {
          this.authToken = { header_name: 'Authorized', header_value: 'Unauthorized' };
          this.authStatus = 'Not Authorized';
        }
      });
  }

  public get authHeader() {
    var authHeader = new Headers();
    authHeader.set(this.authToken.header_name, this.authToken.header_value);
    return authHeader;
  }

  public errorHander(res) {
    if (res.status === 401) {
      this.storage.clear();
      this.events.publish('No Auth');
      this.is_auth_error = false;
      this.authStatus = 'Not Authorized';
    }
    this.authStatus = this.extractErrorMessage(res);
    this.logError(res);
  }

  public getAuthType(): string {
    return this.authType;
  }

  public getAuthStatus(): string {
    return this.authStatus;
  }

  public getUsername(): string {
    return this.username;
  }

  private extractErrorMessage(err) {
    return JSON.parse(err._body).error_description;
  }

  private logError(err) {
    console.error('Error: ' + err);
  }
}
