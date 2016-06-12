import { Validators, NgFormModel, ControlGroup, Control } from '@angular/common';
import { Component } from '@angular/core';
import { NavController, Toast } from 'ionic-angular';

import { LoginPage } from '../login';
import { BackandService, FormHandler } from '../../services';

@Component({
  templateUrl: 'build/pages/create/create.page.html'
})

export class CreatePage {
  createError: boolean;
  createForm: ControlGroup;
  verify: ControlGroup;
  email: Control = new Control('', Validators.compose([Validators.required, this.form.emailValidator]));
  firstName: Control = new Control('', Validators.required);
  lastName: Control = new Control('', Validators.required);
  password: Control  = new Control('', Validators.required);
  confirmPassword: Control = new Control('', Validators.required);

  constructor(private nav:NavController, public backand:BackandService, public form:FormHandler) {
    this.verify = new ControlGroup({
        password: this.password,
        confirmPassword: this.confirmPassword
        }, {}, form.areEqual);
    this.createForm = new ControlGroup({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      verify: this.verify
    });
  }

  accountMade() {
    let made = Toast.create({
      message: 'Your account has been Created Please SignIn',
      duration: 3000
    });

    made.onDismiss(() =>{
      this.nav.pop();
    });
    this.nav.present(made);
  }

  clearAll() {
    this.form.clearForm(this.verify);
    this.form.clearField(this.firstName);
    this.form.clearField(this.lastName);
    this.form.clearField(this.email);
  }

  createUser(create){
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
        console.log(err);
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
