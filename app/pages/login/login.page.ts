import { Validators, NgFormModel, ControlGroup, Control } from '@angular/common';
import { Component, Type, DoCheck } from '@angular/core';
import { NavController, Alert, LocalStorage, Storage, Toast } from 'ionic-angular';

import { Backand, Services } from '../../services';
import { CreatePage } from '../create';
import { SideMenu } from '../shared';

@Component({
  templateUrl: 'build/pages/login/login.page.html'
})

export class LoginPage implements DoCheck {
  signUp:Type = CreatePage;
  local:Storage = new Storage(LocalStorage);
  loginForm:ControlGroup;
  username:Control = new Control('', Validators.compose([Validators.required, this.services.emailValidator]));
  password:Control = new Control('', Validators.required);
  signed:boolean;
  error:boolean;
  reset:boolean;
  attempts:number = 0;

  constructor(private nav:NavController, public backand:Backand, public services:Services) {
    this.loginForm = new ControlGroup({
      username: this.username,
      password: this.password
    });
  }

  ngDoCheck(){
    if(this.attempts >= 5){
      this.reset = true;
    }
  }

  resetVerify() {
    let resVerify = Toast.create({
      message: 'Check Your Email for Password Reset',
      duration: 3000
    });

    resVerify.onDismiss(() => {
      console.log('Dismissed toast');
    });

    this.nav.present(resVerify);
  }

  openPage(page){
    this.nav.push(page);
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
                this.resetVerify();
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
        this.local.set('jwt', data);
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
