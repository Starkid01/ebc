import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FormBase } from './submit-base.form';
import { FormHandler, UserService } from '../../../providers/myservices';

@Component({
  selector: 'ebc-sample-form',
  templateUrl: 'submit-sample.form.html'
})

export class SampleForm extends FormBase {
  @Input() type: boolean;

  bodyName: FormControl = new FormControl('');
  detailForm: FormGroup;
  email: FormControl = new FormControl('', this.form.emailValidator);
  phone: FormControl = new FormControl('', this.form.phoneValidator);

  constructor(public form: FormHandler, public user: UserService) {
    super(user);
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
}