import { Validators, ControlGroup, Control } from '@angular/common';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';

import { BackandService } from '../../services';
import { NavComponent } from '../shared/nav';
import { EbcProduct } from '../shared';
import { SampleForm } from './submit-sample.form';

@Component({
  templateUrl: 'build/pages/submit/submit.page.html',
  directives: [NavComponent, SampleForm]
})

export class SubmitPage {
  @ViewChild(SampleForm) samples: SampleForm;
  
  isFlyer: boolean = false;
  subform: string = 'sample';

  constructor(private backand: BackandService) {
    
  }

  submitItem() {
    let newItem:Object;

    if(this.subform == "sample") {
      newItem = this.samples.tempForm();
      newItem['flyer'] = this.isFlyer;
      console.log(newItem);
    }
  }
}