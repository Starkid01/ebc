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

  constructor(private nav: NavController, public backand: Backand, public services: Services) {
    this.nav = nav;
    this.createForm = new ControlGroup({
      email: new Control('', Validators.required),
      firstName: new Control('', Validators.required),
      lastName: new Control('', Validators.required),
      password: new Control('', Validators.required),
      confirmPassword: new Control('', Validators.required)
    });
  }

  ngDoCheck() {
    console.log(this.createForm);
  }

  clear(c: string) {
    let input = <Control>this.createForm.find(c);

    this.services.clearField(input);
  }

  clearAll() {
    this.services.clearForm(this.createForm);
  }

  createUser(create){

  }
}
