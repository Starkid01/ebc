import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { FormHandler } from '../../providers/myservices';
import { BackandAuthService } from '../../providers/backand';

@IonicPage({
  name: 'create-account',
  segment: 'register'
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
  displayName: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword: FormControl = new FormControl('', Validators.required);

  constructor(private authService: BackandAuthService, private form: FormHandler,
    private nav: NavController, private toast: ToastController) {
    this.verify = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword
    }, form.areEqual);
    this.createForm = new FormGroup({
      email: this.email,
      displayName: this.displayName,
      verify: this.verify
    });
  }

  accountMade(mess) {
    let made = this.toast.create({
      message: mess,
      position: 'top',
      duration: 5000
    });

    made.onDidDismiss(() => {
      this.nav.pop();
    });
    made.present();
  }

  createUser(create) {
    let dets = create.value;
    let pass = dets.verify;
    let user = {
      disabled: false,
      displayName: dets.displayName,
      email: dets.email,
      emailVerified: true,
      password: pass.password,
      photoUrl: 'https://ebc.beezleeart.com/assets/img/user.svg'
    };
    this.authService.createUser(user)
      .subscribe(res => {
        alert('dued')
        this.accountMade('Congrats your account has been Created!');
        console.log(res);
        this.createForm.reset();
      },
        err => {
          alert('naw')
          this.accountMade(err.errror.message);
          console.log(err);
          this.createForm.reset();
        })
  }
}
