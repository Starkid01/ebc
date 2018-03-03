import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, App, IonicPage, ToastController } from 'ionic-angular';

import { UserService, FormHandler } from '../../providers/myservices';

@IonicPage({
  name: 'login',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html'
})

export class LoginPage {
  isAuthError: boolean = false;
  signUp: string = 'create-account';
  loginForm: FormGroup;
  username: FormControl = new FormControl('', [Validators.required, this.form.emailValidator]);
  password: FormControl = new FormControl('', Validators.required);
  signed: boolean;

  constructor(public app: App, public fireAuth: AngularFireAuth, public form: FormHandler,
    public user: UserService, private alert: AlertController, private toast: ToastController) {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  aboutHelp() {
    let nav = this.getRootNav();
    nav.push('about-help');
  }

  openPage(page) {
    let nav = this.getRootNav();
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
            let email = data.username;
            this.sendReset(email);
          }
        }
      ]
    });
    sets.present();
  }

  resetVerify(mess) {
    let resVerify = this.toast.create({
      message: mess,
      position: 'top',
      duration: 3000
    });

    resVerify.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    resVerify.present();
  }

  signIn(login) {
    let auth = login.value;
    this.fireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(auth.username, auth.password)
      .then(auth => {
        this.isAuthError = false;
        this.loginForm.reset();
        console.log(auth);
      })
      .catch(err => {
        this.isAuthError = true;
        this.loginForm.reset();
        console.log(err)
      })
  }

  private getRootNav() {
    let appNavs = this.app.getRootNavs();
    let rootNav = appNavs.find(nav => {
      return nav ? nav['id'] === 'ebc' : null;
    });
    return rootNav;
  }

  private sendReset(email: string) {
    this.fireAuth.auth.sendPasswordResetEmail(email)
    .then(res => {
      console.log(res);
      this.resetVerify('Check Your Email for Password Reset');
    })
    .catch(err => {
      this.resetVerify('That User does not exist. Please Try again.');
      console.log(err)
    });
  }
}
