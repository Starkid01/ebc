import { Validators, ControlGroup, Control } from '@angular/common';
import { Input, DoCheck } from '@angular/core';

export class FormBase implements DoCheck {
  @Input() flyer: boolean;

  data: Control = new Control('');
  desc: Control = new Control('');
  itemForm: ControlGroup;
  isType: string = 'Card';
  name: Control = new Control('', Validators.required);
  pic: Control = new Control('');


  constructor() {

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
}