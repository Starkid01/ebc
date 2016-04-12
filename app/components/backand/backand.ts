import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/Rx';

@Injectable()
export class Backand {
  auth_token:{ header_name : string, header_value: string} = {header_name: '', header_value: ''};
  api_url:string = "https://api.backand.com";
  app_name:string = "ebc2";
  auth_type:string = "N/A";
  auth_status:string = "";
  is_auth_error:boolean = false;

  constructor(public http:Http){

  }

  get tokenUrl(){
    return this.api_url + '/token';
  }

  public signIn(user:string, pass:string){
    this.auth_type = 'Token';
    let creds = `username=${user}` +
      `&password=${pass}` +
      `&appName=${this.app_name}` +
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
      this.auth_token.header_name = 'Authorization';
      this.auth_token.header_value = 'Bearer ' + jwt;
    }
  }

  private getToken(res) {
    console.log(res);
    return res.json().access_token;
  }

  private get authHeader() {
    let authHeader = new Headers();
    authHeader.append(this.auth_token.header_name, this.auth_token.header_value);
    return authHeader;
  }

  logError(err) {
    console.error('Error: ' + err);
  }
  
  public requestReset (email: string) {
    let header = new Headers();
    let reset = this.api_url + '/1/user/requestResetPassword';
    let resetData = JSON.stringify({
      appName: this.app_name,
      username: email
    });
    
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(reset, resetData, {
      headers: header
    })
    .map(res => this.getToken(res))
  }

  public signUp(value:Object){
    let newUser = JSON.stringify(value);
    const sigUpUrl = this.api_url + '/1/user/signup';

    let header = new Headers();
    header.append('SignUpToken', 'dbaea0da-730d-4039-8f8a-77a507a3e908');
    return this.http.post(sigUpUrl, newUser, {
      headers: header
    })
    .map(res => this.getToken(res))
  }

  public currentUser(){
    const userQuery = this.api_url + '/1/query/data/CurrentUser';
    return this.http.get(userQuery, {
      headers: this.authHeader
    }).map(res => res.json())
  }

public updatePass(pass:Object){
    let passwordChange = this.api_url + '/1/objects/user/changePassword';
    let changePass = JSON.stringify(pass);
    this.authHeader.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(passwordChange, changePass, {
      headers: this.authHeader
    }).map(res => res.json())
  }

  public getItems(name:string){
    let itemQuery = this.api_url + '/1/query/data/' + name;
    return this.http.get(itemQuery, {
      headers: this.authHeader
    }).map(res => res.json())
  }

  public getItem(name:string, id:number){
    let itemQuery = this.api_url + '/1/objects/' + name + '/' + id;
    return this.http.get(itemQuery, {
      headers: this.authHeader
    }).map(res => res.json())
  }

  public updateItem(name:string, id:number, data:Object){
    let itemQuery = this.api_url + '/1/objects/' + name + '/' + id;
    let info = JSON.stringify(data);
    return this.http.put(itemQuery, info, {
      headers: this.authHeader
    }).map(res => res.json())
  }
}
