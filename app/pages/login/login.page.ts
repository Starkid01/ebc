import { Validators, NgFormModel, ControlGroup, Control } from '@angular/common';
import { Component, Type } from '@angular/core';
import { NavController, Alert, LocalStorage, Storage, Toast } from 'ionic-angular';

import { BackandService, FormHandler } from '../../services';
import { CreatePage } from '../create';
import { SideMenu } from '../shared';

@Component({
  templateUrl: 'build/pages/login/login.page.html'
})

export class LoginPage {
  signUp: Type = CreatePage;
  local: Storage = new Storage(LocalStorage);
  loginForm: ControlGroup;
  username: Control = new Control('', Validators.compose([Validators.required, this.form.emailValidator]));
  password: Control = new Control('', Validators.required);
  signed: boolean;

  constructor(private nav: NavController, public backand: BackandService, public form: FormHandler) {
    this.loginForm = new ControlGroup({
      username: this.username,
      password: this.password
    });
  }

  clearAll() {
    this.form.clearForm(this.loginForm);
  }

  loggedIn() {
    let nav = this.nav;
    nav.setPages([{ page: SideMenu }], { animate: true });
  }

  openPage(page) {
    this.nav.push(page);
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

  signIn(login) {
    let auth = login.value;

    this.backand.signIn(auth.username, auth.password).subscribe(
      data => {
        this.backand.authStatus = 'OK';
        this.backand.authError = false;
        this.backand.setTokenHeader(data);
        this.local.set('jwt', data);
      },
      err => {
        var errorMessage = this.backand.extractErrorMessage(err);
        this.backand.authStatus = `Error: ${errorMessage}`;
        this.backand.authError = true;
        this.backand.logError(err);
        this.clearAll();
      },
      () => {
        console.log('Finish Auth');
        this.loggedIn();
        this.clearAll();
      });
  }
}
