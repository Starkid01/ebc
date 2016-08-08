import { Validators, REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'ebc-base-form',
  templateUrl: 'build/pages/submit/forms/submit-base.form.html',
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class FormBase implements DoCheck {
  @Input() flyer: boolean;

  data: FormControl = new FormControl('');
  desc: FormControl = new FormControl('');
  itemForm: FormGroup;
  isType: string = 'Card';
  name: FormControl = new FormControl('', Validators.required);
  pic: FormControl = new FormControl('');

  constructor() {
    this.itemForm = new FormGroup({
      name: this.name,
      desc: this.desc,
      data: this.data,
      pic: this.pic
    });
  }

  ngDoCheck() {
    this.checkFlyer();
  }

  checkFlyer() {
    if (this.flyer) {
      return this.isType = 'Flyer';
    } else {
      return this.isType = 'Card';
    }
  }

  formValue() {
    return this.itemForm.value;
  }
}