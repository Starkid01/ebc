import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, Type } from '@angular/core';
import { AlertController, App, ToastController } from 'ionic-angular';

import { BackandAuthService, BackandConfigService, UserService, FormHandler } from '../../providers';
import { CreatePage } from '../create';
import { SideMenu } from '../shared';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html'
})

export class LoginPage {
  signUp: Type<CreatePage> = CreatePage;
  loginForm: FormGroup;
  username: FormControl = new FormControl('', Validators.compose([Validators.required, this.form.emailValidator]));
  password: FormControl = new FormControl('', Validators.required);
  signed: boolean;

  constructor(public app: App,
    public auth: BackandAuthService,
    public config: BackandConfigService,
    public form: FormHandler,
    public user: UserService,
    private alert: AlertController,
    private toast: ToastController) {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  clearAll() {
    this.form.clearForm(this.loginForm);
  }

  loggedIn() {
    let nav = this.app.getRootNav();
    nav.setPages([{ page: SideMenu }], { animate: true });
  }

  openPage(page) {
    let nav = this.app.getRootNav();
    nav.push(page);
  }

  resetPass() {
    let sets = this.alert.create({
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
            this.auth.requestResetPassword(e).subscribe(
              data => this.resetVerify());
          }
        }
      ]
    });
    sets.present();
  }

  resetVerify() {
    let resVerify = this.toast.create({
      message: 'Check Your Email for Password Reset',
      duration: 3000
    });

    resVerify.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    resVerify.present();
  }

  signIn(login) {
    let auth = login.value;

    this.auth.getAuthToken(auth.username, auth.password).subscribe(
      data => {
        this.loggedIn();
        this.clearAll();
      },
      err => this.clearAll(),
      () => this.user.getUser());
  }
}
