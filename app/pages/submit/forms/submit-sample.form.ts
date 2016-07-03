import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Validators, ControlGroup, Control } from '@angular/common';
import { NavController } from 'ionic-angular';

import { FormBase } from './submit-base.form';

@Component({
  selector: 'ebc-sample-form',
  templateUrl: 'build/pages/submit/forms/submit-sample.form.html'
})

export class SampleForm extends FormBase {
  bodyName: Control = new Control('', Validators.required);
  detailForm: ControlGroup;
  email: Control = new Control('');
  phone: Control = new Control('');

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
    let details = JSON.stringify(this.detailForm.value);
    return details;
  }

  tempForm() {
    return this.itemForm.value;
  }
}