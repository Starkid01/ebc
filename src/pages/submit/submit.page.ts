import { AfterViewChecked, DoCheck, Component, ViewChild } from '@angular/core';
import { ModalController, Slides } from 'ionic-angular';

import { PictureService } from '../../providers';
import { FormBase, PicForm, SampleForm, SelectForm, SocialForm } from './forms';
import { SubmitConfirm } from './submit-confirm.modal';

@Component({
  selector: 'page-submit',
  templateUrl: 'submit.page.html'
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
  subform: string;
  slideOpts: Object = { initialSlide: 1 };
  invalidForm: boolean;

  constructor(private modal: ModalController, public pic: PictureService) {

  }

  ngAfterViewChecked() {
    this.formValid();
  }

  ngDoCheck() {
    this.isValid = this.invalidForm;
    if (this.subform !== undefined) {
      this.loaded = true;
    }
  }

  confirmInput(newItem) {
    let confirm = this.modal.create(SubmitConfirm, newItem);
    confirm.present();
  }

  existForm() {
    if (this.base.itemForm.valid) {
      let item = this.base.formValue();
      let build = {
        create: this.base.data.value
      };
      item['flyer'] = this.isFlyer;
      item['data'] = [build];
      return this.getSocial(item);
    } else {
      return null;
    }
  }

  getSocial(input) {
    let item = input;
    if (this.social.socialAdded()) {
      item['data'] = Array.prototype.concat(this.social.socialData(), input['data']);
    }
    item['pic'] = this.pics.getArt();
    return item;
  }

  newForm() {
    if (this.samples.itemForm.valid && this.samples.detailCheck()) {
      let item = this.samples.formValue();
      let build = {
        create: this.samples.data.value
      };
      item['flyer'] = this.isFlyer;
      item['data'] = [this.samples.detailContact(), build];
      return this.getSocial(item);
    } else {
      return null;
    }
  }

  nextForm(i: number) {
    this.steps.slideTo(i);
  }

  sampleForm() {
    if (this.select.selectedValid() && this.samples.itemForm.valid && this.samples.detailCheck()) {
      let build = {
        create: this.samples.data.value
      };
      let data = {
        selID: this.select.findSample().id,
        selName: this.select.findSample().name
      }
      let item = this.samples.tempForm();
      item['flyer'] = this.isFlyer;
      item['data'] = [this.samples.detailContact(), data, build];
      return this.getSocial(item);
    } else {
      return null;
    }
  }

  submitItem() {
    let newItem: Object = {};

    if (this.subform === 'sample' && this.sampleForm() !== null) {
      newItem = this.sampleForm();
    }
    if (this.subform === 'exist' && this.existForm() !== null) {
      newItem = this.existForm();
    }
    if (this.subform === 'new' && this.newForm() !== null) {
      newItem = this.newForm();
    }

    this.confirmInput(newItem);
  }

  formValid() {
    if (this.subform === 'sample' && this.sampleForm() !== null) {
      this.invalidForm = false;
    } else if (this.subform === 'exist' && this.existForm() !== null) {
      this.invalidForm = false;
    } else if (this.subform === 'new' && this.newForm() !== null) {
      this.invalidForm = false;
    } else {
      this.invalidForm = true;
    }
  }
}