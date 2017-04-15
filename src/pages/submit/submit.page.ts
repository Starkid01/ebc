import { AfterViewChecked, ChangeDetectorRef, Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ModalController, Slides } from 'ionic-angular';

import { PictureService } from '../../providers/myservices';
import { FormBase, PicForm, SampleForm, SelectForm, SocialForm } from './forms';
import { SubmitConfirm } from './submit-confirm.modal';

@Component({
  selector: 'page-submit',
  templateUrl: 'submit.page.html'
})

export class SubmitPage implements AfterViewChecked, OnInit, DoCheck {
  @ViewChild(FormBase) base: FormBase;
  @ViewChild(SampleForm) samples: SampleForm;
  @ViewChild(SelectForm) select: SelectForm;
  @ViewChild(SocialForm) social: SocialForm;
  @ViewChild(PicForm) pics: PicForm;
  @ViewChild('steps') steps: Slides;

  addPic: boolean = false;
  addSocial: boolean = false;
  isFlyer: boolean = false;
  isValid: boolean = false;
  invalidForm: boolean;
  loaded: boolean = false;
  subform: string;

  constructor(private detect:ChangeDetectorRef, private modal: ModalController, public pic: PictureService) { }

  ngAfterViewChecked() {
    this.steps.lockSwipes(true);
    this.formValid();
    this.detect.detectChanges();
  }

  ngOnInit() {
    this.steps.autoHeight = true;
  }

  ngDoCheck() {
    this.isValid = this.invalidForm;
    if (this.subform !== undefined) {
      this.loaded = true;
    }
    this.steps.update();
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

   formValid() {
    if (this.subform === 'temp' && this.select.selectedValid()) {
      this.invalidForm = false;
    } else {
      this.invalidForm = true;
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

  nextSlide(prev: boolean) {
    this.steps.lockSwipes(false);
    if(prev) {
      this.steps.slidePrev();
    } else {
      this.steps.slideNext();
    }
  }

  sampleForm() {
    if (this.select.selectedValid() && this.samples.itemForm.valid && this.samples.detailCheck()) {
      let build = {
        create: this.samples.data.value
      };
      let data = {
        selID: this.select.findSample().id,
        selName: this.select.findSample().name,
        selImg: this.select.findSample().pic
      }
      /*let item = this.samples.tempForm();
      item['flyer'] = this.isFlyer;
      item['data'] = [this.samples.detailContact(), data, build];
      return this.getSocial(item);*/
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
}