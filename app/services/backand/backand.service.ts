import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

interface BackandHeader {
  title:string,
  value:string
}

@Injectable()
export class BackandService {
  authToken:BackandHeader = {title:'', value:''};
  apiUrl:string = "https://api.backand.com";
  appName:string = "ebc2";
  authType:string = "N/A";
  authStatus:string = "";
  authError:boolean = false;

  constructor(public http:Http){

  }

  get tokenUrl(){
    return this.apiUrl + '/token';
  }

  public signIn(user:string, pass:string){
    this.authType = 'Token';
    let creds = `username=${user}` +
      `&password=${pass}` +
      `&appName=${this.appName}` +
      `&grant_type=password`;
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.tokenUrl, creds, {
      headers: header
    })
    .map(res => this.getToken(res))
  }

  public extractErrorMessage (err) {
    return JSON.parse(err._body).error_description;
  }

  public setTokenHeader(jwt) {
    if (jwt) {
      this.authToken.title = 'Authorization';
      this.authToken.value = 'Bearer ' + jwt;
    }
  }

  private getToken(res) {
    console.log(res);
    return res.json().access_token;
  }

  private get authHeader() {
    let authHeader = new Headers();
    authHeader.append(this.authToken.title, this.authToken.value);
    return authHeader;
  }

  logError(err) {
    console.error('Error: ' + err);
  }

  public requestReset (email: string) {
    let header = new Headers();
    let reset = this.apiUrl + '/1/user/requestResetPassword';
    let resetData = JSON.stringify({
      appName: this.appName,
      username: email
    });

    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(reset, resetData, {
      headers: header
    })
    .map(res => res)
  }

  public signUp(value:Object){
    let newUser = JSON.stringify(value);
    const sigUpUrl = this.apiUrl + '/1/user/signup';

    let header = new Headers();
    header.append('SignUpToken', 'dbaea0da-730d-4039-8f8a-77a507a3e908');
    return this.http.post(sigUpUrl, newUser, {
      headers: header
    })
    .map(res => this.getToken(res))
  }

  public currentUser(){
    const userQuery = this.apiUrl + '/1/query/data/CurrentUser';
    return this.http.get(userQuery, {
      headers: this.authHeader
    }).map(res => res.json())
  }

  public updatePass(pass:Object){
    let passwordChange = this.apiUrl + '/1/user/changePassword';
    let changePass = JSON.stringify(pass);
    this.authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(passwordChange, changePass, {
      headers: this.authHeader
    }).map(res => res)
  }

  public getItems(item:string){
    let itemQuery = this.apiUrl + '/1/query/data/' + item;
    return this.http.get(itemQuery, {
      headers: this.authHeader
    }).map(res => res.json())
  }

  public getItem(item:string, id:number){
    let itemQuery = this.apiUrl + '/1/objects/' + item + '/' + id;
    return this.http.get(itemQuery, {
      headers: this.authHeader
    }).map(res => res.json())
  }

  public updateItem(item:string, id:number, data:Object){
    let itemQuery = this.apiUrl + '/1/objects/' + item + '/' + id;
    let info = JSON.stringify(data);
    this.authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.put(itemQuery, info, {
      headers: this.authHeader
    }).map(res => res)
  }
}
