import { Validators, ControlGroup, Control } from '@angular/common';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { BackandService, PictureService } from '../../services';
import { NavComponent } from '../shared/nav';
import { EbcProduct } from '../shared';
import { MyLoader } from '../shared/myloader';
import { EbcData, PicForm, SampleForm, SelectForm, SocialForm } from './forms';

@Component({
  templateUrl: 'build/pages/submit/submit.page.html',
  directives: [NavComponent, MyLoader, PicForm, SampleForm, SelectForm, SocialForm],
	providers: [PictureService]
})

export class SubmitPage {
  @ViewChild(SampleForm) samples: SampleForm;
  @ViewChild(SelectForm) select: SelectForm;
  @ViewChild(SocialForm) social: SocialForm;
  @ViewChild(PicForm) pics: PicForm;
  @ViewChild('steps') steps: Slides;

  isFlyer: boolean = false;
  subform: string = 'sample';
  slideOpts: Object = {
    initialSlide: 1
  }

  constructor(private backand: BackandService, public pic: PictureService) {

  }

  getSocial(input: EbcData) {
    let item = input;
    if (this.social.socialAdded()) {
      item['data'] = input['data'].concat(this.social.socialData());
    }
    if(this.pics.hasArt) {
      item['pic'] = this.pics.getArt();
    }
    return item;
  }

  nextForm(i: number) {
    this.steps.slideTo(i);
  }

  sampleTemp() {
    if (this.select.selectedValid() && this.samples.itemForm.valid && this.samples.detailForm.dirty) {
      let data = {
        selID: this.select.findSample().id,
        selName: this.select.findSample().name
      }
      let item = this.samples.tempForm();
      item['flyer'] = this.isFlyer;
      item['data'] = String.prototype.concat(JSON.stringify(data), this.samples.detailContact());
      return this.getSocial(item);
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