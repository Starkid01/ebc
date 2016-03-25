import {FORM_DIRECTIVES, NgClass, Validators, NgFormModel, ControlGroup, Control} from 'angular2/common';
import {Type} from 'angular2/core';
import {Page, NavController, Alert} from 'ionic-angular';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';
import {CreatePage} from '../create/create';
import {SideMenu} from '../sidemenu/sidemenu';

@Page({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES],
  providers: [Backand, Services]
})

export class LoginPage {
  signUp: Type = CreatePage;
  loginForm: ControlGroup;
  signed: boolean;
  error: boolean;
  reset: boolean;
  attempts: number = 0;

  constructor(private nav: NavController, public backand: Backand, public services: Services) {
    this.nav = nav;
    this.loginForm = new ControlGroup({
      username: new Control('', Validators.required),
      password: new Control('', Validators.required)
    });
  }
  
  ngDoCheck(){
    if(this.attempts >= 5){
      this.reset = true;
    }
  }

  openPage(page){
    this.nav.push(page);
  }

  clear(c: string) {
    let input = <Control>this.loginForm.find(c);

    this.services.clearField(input);
  }

  clearAll() {
    this.services.clearForm(this.loginForm);
  }

  loggedIn() {
    let nav = this.nav;
    nav.setPages([{page: SideMenu}], {animate: true});
  }
  
  resetPass() {
    let sets = Alert.create({
      title: 'Reset Password',
      message: 'Enter Email to Recieve a Password Reset Link',
      inputs: [
        {
          name: 'username',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Submit',
          handler: data => {
            let e = data.username;
            console.log(e);
            this.backand.requestReset(e).subscribe(
              data => console.log('Reset Request Sent'),
              err => {
                console.log(err)
              },
              () => {
                console.log('Check Your Email')
              });
          }
        }
      ]
    });
    this.nav.present(sets);
  }

  signIn(login){
    let auth = login.value;
    
    this.backand.signIn(auth.username, auth.password).subscribe(
      data => {
        this.backand.auth_status = 'OK';
        this.backand.is_auth_error = false;
        this.backand.setTokenHeader(data);
      },
      err => {
        var errorMessage = this.backand.extractErrorMessage(err);
        this.backand.auth_status = `Error: ${errorMessage}`;
        this.backand.is_auth_error = true;
        this.error = this.backand.is_auth_error;
        this.backand.logError(err);
        this.attempts = this.attempts+1;
        this.clearAll();
      },
      () => {
        console.log('Finish Auth');
        this.loggedIn();
        this.clearAll();
      });
  }
}
