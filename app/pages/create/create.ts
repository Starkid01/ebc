import {FORM_DIRECTIVES, NgClass, Validators, NgFormModel, ControlGroup, Control} from 'angular2/common';
import {Page, NavController, Alert} from 'ionic-angular';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/create/create.html',
  directives: [FORM_DIRECTIVES],
  providers: [Backand, Services]
})

export class CreatePage {
  createForm: ControlGroup;
  verify: ControlGroup;
  email: Control = new Control('', Validators.required);
  firstName: Control = new Control('', Validators.required);
  lastName: Control = new Control('', Validators.required);
  password: Control  = new Control('', Validators.required);
  confirmPassword: Control = new Control('', Validators.required);

  constructor(private nav: NavController, public backand: Backand, public services: Services) {
    this.nav = nav;
    this.createForm = new ControlGroup({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      verify: new ControlGroup({
        password: this.password,
        confirmPassword: this.confirmPassword
        }, {}, this.areEqual)
    });
  }

  areEqual(g: ControlGroup) {
    let equal = g.value;
    const vals = Object.keys(equal).map(key => equal[key]);
    if(vals[0] != vals[1]){
      return {notEqual: true};
    }
    else{
      return null;
    }
  }

  clearAll() {
    this.services.clearForm(this.createForm);
  }

  createUser(create){

  }
}
