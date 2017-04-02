import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, Type } from '@angular/core';
import { AlertController, App, ToastController, ModalController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

import { AboutHelpPage } from '../about-help';
import { BackandAuthService } from '../../providers/backand';
import { UserService, FormHandler } from '../../providers/myservices';
import { CreatePage } from '../create';
import { SideMenu } from '../shared';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html'
})

export class LoginPage {
  signUp: Type<CreatePage> = CreatePage;
  loginForm: FormGroup;
  username: FormControl = new FormControl('', [Validators.required, this.form.emailValidator]);
  password: FormControl = new FormControl('', Validators.required);
  signed: boolean;

  constructor(public app: App,
    public auth: BackandAuthService,
    public backand: BackandService,
    public form: FormHandler,
    public user: UserService,
    private alert: AlertController,
    private toast: ToastController,
    private modal: ModalController) {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  aboutHelp() {
    let nav = this.app.getRootNav();
    nav.push(AboutHelpPage);
  }

  clearAll() {
    this.form.clearForm(this.loginForm);
  }

  loggedIn() {
    let nav = this.app.getRootNav();
    nav.setRoot(SideMenu);
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
            this.backand.requestResetPassword(e)
              .then(data => this.resetVerify());
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

    this.backand.signin(auth['username'], auth['password'])
      .then(res => {
        this.auth.authGood(res);
        this.user.getUser();
        this.clearAll();
        this.loggedIn();      
      })
      .catch(err => {
        this.auth.authErr(err);
        this.clearAll();
      });
  }
}
