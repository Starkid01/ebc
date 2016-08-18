import { Component, ViewChild } from '@angular/core';
import { Validators, REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { FormBase } from './submit-base.form';
import { FormHandler, UserService } from '../../../services';

@Component({
  selector: 'ebc-sample-form',
  templateUrl: 'build/pages/submit/forms/submit-sample.form.html',
  directives: [REACTIVE_FORM_DIRECTIVES]
})

export class SampleForm extends FormBase {
  bodyName: FormControl = new FormControl('', Validators.required);
  detailForm: FormGroup;
  email: FormControl = new FormControl('', FormHandler.prototype.emailValidator);
  phone: FormControl = new FormControl('', FormHandler.prototype.phoneValidator);

  constructor(private nav: NavController, public user: UserService) {
    super(user);
    this.itemForm = new FormGroup({
      name: this.name,
      desc: this.desc,
      data: this.data,
      pic: this.pic
    });
    this.detailForm = new FormGroup({
      bodyName: this.bodyName,
      email: this.email,
      phone: this.phone
    });
  }

  detailContact() {
    let details = this.detailForm.value;
    return details;
  }

  detailCheck() {
    let field: Array<boolean> = [
      this.bodyName.valid
    ];

    if (this.email.touched && this.email.value !== '') {
      field.push(this.email.valid);
    }

    if (this.phone.touched && this.phone.value !== '') {
      field.push(this.phone.valid);
    }

    return field.every(validField => validField === true);
  }

  tempForm() {
    return this.itemForm.value;
  }
}