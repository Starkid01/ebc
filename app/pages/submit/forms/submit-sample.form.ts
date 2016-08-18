import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Validators, REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { FormBase } from './submit-base.form';
import { FormHandler, UserService } from '../../../services';

@Component({
  selector: 'ebc-sample-form',
  templateUrl: 'build/pages/submit/forms/submit-sample.form.html',
  directives: [REACTIVE_FORM_DIRECTIVES]
})

export class SampleForm extends FormBase implements OnInit {
  bodyName: FormControl = new FormControl('', Validators.required);
  detailForm: FormGroup;
  email: FormControl = new FormControl('', FormHandler.prototype.emailValidator);
  phone: FormControl = new FormControl('', FormHandler.prototype.phoneValidator);
  titleName: string;

  constructor(private nav: NavController, public user: UserService) {
    super();
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

  ngDoCheck() {
    super.checkFlyer();

    if (this.flyer) {
      this.titleName = 'Event';
    } else {
      this.titleName = 'Business';
    }
  }

  ngOnInit() {
    this.desc.updateValue(this.user.myUser['email']);
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