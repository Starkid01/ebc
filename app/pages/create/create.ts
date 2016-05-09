import {FORM_DIRECTIVES, NgClass, Validators, NgFormModel, ControlGroup, Control} from 'angular2/common';
import {Page, NavController, Toast} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/create/create.html',
  directives: [FORM_DIRECTIVES]
})

export class CreatePage {
  createError: boolean;
  createForm: ControlGroup;
  verify: ControlGroup;
  email: Control = new Control('', Validators.compose([Validators.required, this.services.emailValidator]));
  firstName: Control = new Control('', Validators.required);
  lastName: Control = new Control('', Validators.required);
  password: Control  = new Control('', Validators.required);
  confirmPassword: Control = new Control('', Validators.required);

  constructor(private nav:NavController, public backand:Backand, public services:Services) {
    this.verify = new ControlGroup({
        password: this.password,
        confirmPassword: this.confirmPassword
        }, {}, services.areEqual);
    this.createForm = new ControlGroup({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      verify: this.verify
    });
  }

  clearAll() {
    this.services.clearForm(this.verify);
    this.services.clearField(this.firstName);
    this.services.clearField(this.lastName);
    this.services.clearField(this.email);
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
