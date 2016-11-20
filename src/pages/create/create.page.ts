import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { BackandService, FormHandler } from '../../providers';

@Component({
  selector: 'page-create',
  templateUrl: 'create.page.html'
})

export class CreatePage {
  createError: boolean;
  createForm: FormGroup;
  verify: FormGroup;
  email: FormControl = new FormControl('', Validators.compose([Validators.required, this.form.emailValidator]));
  firstName: FormControl = new FormControl('', Validators.required);
  lastName: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required);
  confirmPassword: FormControl = new FormControl('', Validators.required);

  constructor(private toast: ToastController, private nav: NavController, public backand: BackandService, public form: FormHandler) {
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

  accountMade() {
    let made = this.toast.create({
      message: 'Your account has been Created Please SignIn',
      duration: 3000
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

    this.backand.signUp(user).subscribe(
      data => {
        console.log(data);
      },
      err => {
        this.backand.errorHander(err);
        this.createError = true;
        this.clearAll();
      },
      () => {
        console.log('User Created');
        this.createError = false;
        this.accountMade();
        this.clearAll();
      });
  }
}