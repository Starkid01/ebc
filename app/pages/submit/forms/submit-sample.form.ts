import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Validators, ControlGroup, Control } from '@angular/common';
import { NavController } from 'ionic-angular';

import { FormBase } from './submit-base.form';
import { FormHandler } from '../../../services';

@Component({
  selector: 'ebc-sample-form',
  templateUrl: 'build/pages/submit/forms/submit-sample.form.html'
})

export class SampleForm extends FormBase {
  bodyName: Control = new Control('', Validators.required);
  detailForm: ControlGroup;
  email: Control = new Control('', FormHandler.prototype.emailValidator);
  phone: Control = new Control('', FormHandler.prototype.phoneValidator);

  constructor(private nav: NavController) {
    super();
    this.itemForm = new ControlGroup({
      name: this.name,
      desc: this.desc,
      data: this.data,
      pic: this.pic
    });
    this.detailForm = new ControlGroup({
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

    if (this.email.touched && this.email.value != '') {
      field.push(this.email.valid);
    }

    if (this.phone.touched && this.phone.value != '') {
      field.push(this.phone.valid);
    }

    return field.every(validField => validField == true);
  }

  tempForm() {
    return this.itemForm.value;
  }
}