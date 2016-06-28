import { Validators, ControlGroup, Control } from '@angular/common';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { BackandService } from '../../services';
import { NavComponent } from '../shared/nav';
import { EbcProduct } from '../shared';
import { SampleForm, SelectForm, SocialForm } from './forms';

@Component({
  templateUrl: 'build/pages/submit/submit.page.html',
  directives: [NavComponent, SampleForm, SelectForm, SocialForm]
})

export class SubmitPage {
  @ViewChild(SampleForm) samples: SampleForm;
  @ViewChild(SelectForm) select: SelectForm;
  @ViewChild('steps') steps: Slides;

  isFlyer: boolean = false;
  subform: string = 'sample';

  constructor(private backand: BackandService) {

  }

  nextForm(i:number) {
    this.steps.slideTo(i);
  }

  sampleTemp() {
    if (this.select.selectedValid() && this.samples.itemForm.valid) {
      let data = {
        selID: this.select.findSample().id,
        selName: this.select.findSample().name
      }
      let item = this.samples.tempForm();
      item['flyer'] = this.isFlyer;
      item['data'] = JSON.stringify(data);
      return item;
    }
  }

  submitItem() {
    let newItem: Object = {};

    if (this.subform == "sample" && this.sampleTemp() !== undefined) {
      newItem = this.sampleTemp();
    }
    console.log(newItem);
  }
}