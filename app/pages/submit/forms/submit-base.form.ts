import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, DoCheck } from '@angular/core';

import { UserService } from '../../../services';

@Component({
  selector: 'ebc-base-form',
  templateUrl: 'build/pages/submit/forms/submit-base.form.html'
})
export class FormBase implements DoCheck {
  @Input() flyer: boolean;

  data: FormControl = new FormControl('');
  desc: FormControl = new FormControl('');
  itemForm: FormGroup;
  isType: string = 'Card';
  name: FormControl = new FormControl('', Validators.required);
  pic: FormControl = new FormControl('');
  titleName: string;

  constructor(public user: UserService) {
    this.itemForm = new FormGroup({
      name: this.name,
      desc: this.desc,
      data: this.data,
      pic: this.pic
    });
  }

  ngDoCheck() {
    this.checkFlyer();
    this.setTitle();
  }

  ngOnInit() {
    this.desc.updateValue(this.user.myUser['email']);
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

  setTitle() {
    if (this.flyer) {
      return this.titleName = 'Event';
    } else {
      return this.titleName = 'Business';
    }
  }
}