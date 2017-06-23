import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

import { FormHandler } from '../../providers/myservices';

@IonicPage({
  name: 'create-account',
  segment: 'create-account'
})
@Component({
  selector: 'page-create',
  templateUrl: 'create.page.html'
})

export class CreatePage {
  createError: boolean;
  createForm: FormGroup;
  verify: FormGroup;
  email: FormControl = new FormControl('', [Validators.required, this.form.emailValidator]);
  firstName: FormControl = new FormControl('', Validators.required);
  lastName: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword: FormControl = new FormControl('', Validators.required);

  constructor(private backand: BackandService, private form: FormHandler, 
  private nav: NavController, private toast: ToastController) {
    this.verify = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword
    }, form.areEqual);
    this.createForm = new FormGroup({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      verify: this.verify
    });
  }

  accountMade(mess) {
    let made = this.toast.create({
      message: mess,
      duration: 5000
    });

    made.onDidDismiss(() => {
      this.nav.pop();
    });
    made.present();
  }

  clearAll() {
    this.form.clearForm(this.verify);
    this.form.clearField(this.firstName);
    this.form.clearField(this.lastName);
    this.form.clearField(this.email);
  }

  createUser(create) {
    let dets = create.value;
    let pass = dets.verify;
    let user = {
      email: dets.email,
      firstName: dets.firstName,
      lastName: dets.lastName,
      password: pass.password,
      confirmPassword: pass.confirmPassword
    };

    this.backand.signup(user.firstName, user.lastName, user.email, user.password, user.confirmPassword)
      .then(data => {
        this.createError = false;
        this.accountMade(data['message']);
        this.clearAll();
      })
      .catch(err => {
        this.createError = true;
        this.clearAll();
      });
  }
}
