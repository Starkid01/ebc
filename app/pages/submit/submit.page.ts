import { Validators, ControlGroup, Control } from '@angular/common';
import { Component, DoCheck } from '@angular/core';

import { BackandService } from '../../services';
import { NavComponent } from '../shared/nav';

@Component({
  templateUrl: 'build/pages/submit/submit.page.html',
  directives: [NavComponent]
})

export class SubmitPage implements DoCheck {
  flyer:Control = new Control('');
  name:Control = new Control('', Validators.required)
  isFlyer:boolean = false;
  itemForm:ControlGroup;
  isType:string = 'Card';
  subform:string = 'sample';

  constructor() {
    this.itemForm = new ControlGroup({
      name: this.name,
      flyer: this.flyer
    })
  }

  ngDoCheck() {
    if(this.isFlyer){
      this.isType = 'Flyer';
    } else {
      this.isType = 'Card';
    }
  }
}
