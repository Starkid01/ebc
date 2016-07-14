import { Validators, ControlGroup, Control } from '@angular/common';
import { Component, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'ebc-base-form',
  templateUrl: 'build/pages/submit/forms/submit-base.form.html'
})
export class FormBase implements DoCheck {
  @Input() flyer: boolean;

  data: Control = new Control('');
  desc: Control = new Control('');
  itemForm: ControlGroup;
  isType: string = 'Card';
  name: Control = new Control('', Validators.required);
  pic: Control = new Control('');

  constructor() {
    this.itemForm = new ControlGroup({
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