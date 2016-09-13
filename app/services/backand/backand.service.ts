import 'rxjs';
import { Http, Headers } from '@angular/http';
import { Injectable, ViewChild } from '@angular/core';
import { Events, LocalStorage, Storage } from 'ionic-angular';

interface BackandHeader {
  title: string;
  value: string;
}

@Injectable()
export class BackandService {
  appName: string = 'ebc2';
  apiUrl: string = 'https://api.backand.com';
  authError: boolean = false;
  authStatus: string = '';
  authToken: BackandHeader = { title: '', value: '' };
  authType: string = 'N/A';
  local: LocalStorage = new Storage(LocalStorage);

  constructor(public http: Http, private events: Events) {

  }

  public addItem(newItem: Object) {
    let itemsUrl = `${this.apiUrl}/1/objects/items`;
    let myItem = JSON.stringify(newItem);
    this.authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(itemsUrl, myItem, {
      headers: this.authHeader
    })
      .map(res => res);
  }

  public currentUser() {
    const userQuery = `${this.apiUrl}/1/query/data/CurrentUser`;
    return this.http.get(userQuery, {
      headers: this.authHeader
    }).map(res => res.json());
  }

  public errorHander(res) {
    if (res.status === 401) {
      this.local.clear();
      this.events.publish('No Auth');
      console.log('Go To Login');
    };
    let errorMessage = this.extractErrorMessage(res);
    this.authStatus = `Error: ${errorMessage}`;
    this.authError = true;
    this.logError(res);
    console.log('Just Error');
  }

  public getItem(item: string, id: number) {
    let itemQuery = `${this.apiUrl}/1/objects/${item}/${id}`;
    return this.http.get(itemQuery, {
      headers: this.authHeader
    }).map(res => res.json());
  }

  public getItems(item: string) {
    const itemQuery = `${this.apiUrl}/1/query/data/${item}`;
    return this.http.get(itemQuery, {
      headers: this.authHeader
    }).map(res => res.json());
  }

  public isAuth(jwt) {
    this.authToken = JSON.parse(jwt);
    this.authHeader;
  }

  public requestReset(email: string) {
    let header = new Headers();
    const reset = `${this.apiUrl}/1/user/requestResetPassword`;
    let resetData = JSON.stringify({
      appName: this.appName,
      username: email
    });

    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(reset, resetData, {
      headers: header
    })
      .map(res => res);
  }

  public setTokenHeader(jwt) {
    if (jwt) {
      this.authToken.title = 'Authorization';
      this.authToken.value = `Bearer ${jwt}`;
      this.local.set('jwt', JSON.stringify(this.authToken));
    }
  }

  public signIn(user: string, pass: string) {
    this.authType = 'Token';
    let creds = `username=${user}&password=${pass}&appName=${this.appName}&grant_type=password`;
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.tokenUrl, creds, {
      headers: header
    })
      .map(res => this.getToken(res));
  }

  public signUp(value: Object) {
    let newUser = JSON.stringify(value);
    const sigUpUrl = `${this.apiUrl}/1/user/signup`;

    let header = new Headers();
    header.append('SignUpToken', 'dbaea0da-730d-4039-8f8a-77a507a3e908');
    return this.http.post(sigUpUrl, newUser, {
      headers: header
    })
      .map(res => this.getToken(res));
  }

  get tokenUrl() {
    return `${this.apiUrl}/token`;
  }

  public updateItem(item: string, id: number, data: Object) {
    let itemQuery = `${this.apiUrl}/1/objects/${item}/${id}`;
    let info = JSON.stringify(data);
    this.authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.put(itemQuery, info, {
      headers: this.authHeader
    }).map(res => res);
  }

  public updatePass(pass: Object) {
    const passwordChange = `${this.apiUrl}/1/user/changePassword`;
    let changePass = JSON.stringify(pass);
    this.authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(passwordChange, changePass, {
      headers: this.authHeader
    }).map(res => res);
  }

  private get authHeader() {
    let authHeader = new Headers();
    authHeader.append(this.authToken.title, this.authToken.value);
    return authHeader;
  }

  private extractErrorMessage(err) {
    return JSON.parse(err._body).error_description;
  }

  private getToken(res) {
    console.log(res);
    return res.json().access_token;
  }

  private logError(err) {
    console.error('Error: ' + err);
  }
}
