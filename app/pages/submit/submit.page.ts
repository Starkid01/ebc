import { Validators, ControlGroup, Control } from '@angular/common';
import { AfterViewChecked, DoCheck, Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { BackandService, PictureService } from '../../services';
import { NavComponent } from '../shared/nav';
import { EbcProduct } from '../shared';
import { MyLoader } from '../shared/myloader';
import { FormBase, EbcData, PicForm, SampleForm, SelectForm, SocialForm } from './forms';

@Component({
  templateUrl: 'build/pages/submit/submit.page.html',
  directives: [NavComponent, FormBase, MyLoader, PicForm, SampleForm, SelectForm, SocialForm],
  providers: [PictureService]
})

export class SubmitPage implements AfterViewChecked, DoCheck {
  @ViewChild(FormBase) base: FormBase;
  @ViewChild(SampleForm) samples: SampleForm;
  @ViewChild(SelectForm) select: SelectForm;
  @ViewChild(SocialForm) social: SocialForm;
  @ViewChild(PicForm) pics: PicForm;
  @ViewChild('steps') steps: Slides;

  isFlyer: boolean = false;
  isValid: boolean = false;
  loaded: boolean = false;
  subform: string = 'sample';
  slideOpts: Object = { initialSlide: 1 };
  invalidForm: boolean;

  constructor(private backand: BackandService, public pic: PictureService) {

  }

  ngAfterViewChecked() {
    this.formValid();
  }

  ngDoCheck() {
    this.isValid = this.invalidForm;
  }

  existForm() {
    if (this.base.itemForm.valid) {
      let item = this.base.formValue();
      item['flyer'] = this.isFlyer;
      return this.getSocial(item);
    }
    else {
      return null;
    }
  }

  getSocial(input: EbcData) {
    let item = input;
    if (this.social.socialAdded()) {
      item['data'] = input['data'].concat(this.social.socialData());
    }
    if (this.pics.hasArt) {
      item['pic'] = this.pics.getArt();
    }
    return item;
  }

  newForm() {
    if (this.samples.itemForm.valid && this.samples.detailCheck()) {
      let item = this.samples.formValue();
      item['flyer'] = this.isFlyer;
      item['data'] = this.samples.detailContact();
      return this.getSocial(item);
    }
    else {
      return null;
    }
  }

  nextForm(i: number) {
    this.steps.slideTo(i);
  }

  sampleForm() {
    if (this.select.selectedValid() && this.samples.itemForm.valid && this.samples.detailCheck()) {
      let data = {
        selID: this.select.findSample().id,
        selName: this.select.findSample().name
      }
      let item = this.samples.tempForm();
      item['flyer'] = this.isFlyer;
      item['data'] = String.prototype.concat(JSON.stringify(data), this.samples.detailContact());
      return this.getSocial(item);
    }
    else {
      return null;
    }
  }

  submitItem() {
    let newItem: Object = {};

    if (this.subform == 'sample' && this.sampleForm() !== null) {
      newItem = this.sampleForm();
    }
    if (this.subform == 'exist' && this.existForm() !== null) {
      newItem = this.existForm();
    }
    if (this.subform == 'new' && this.newForm() !== null) {
      newItem = this.newForm();
    }
  }

  formValid() {
    if (this.subform == 'sample' && this.sampleForm() !== null) {
      this.invalidForm = false;
    }
    else if (this.subform == 'exist' && this.existForm() !== null) {
      this.invalidForm = false;
    }
    else if (this.subform == 'new' && this.newForm() !== null) {
      this.invalidForm = false;
    }
    else {
      this.invalidForm = true;
    }
  }
}