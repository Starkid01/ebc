import { AfterViewChecked, ChangeDetectorRef, Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { IonicPage, ModalController, Slides } from 'ionic-angular';

import { PictureService } from '../../providers/myservices';
import { FormBase, PicForm, SampleForm, SelectForm, SocialForm } from './forms';
import { SubmitConfirm } from './submit-confirm.modal';

@IonicPage({
  name: 'submit'
})
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

  constructor(private detect: ChangeDetectorRef, private modal: ModalController, public pic: PictureService) { }

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
      if (this.subform === 'exist') {
        this.addPic = true;
      }
    }
    this.steps.update();
  }

  confirmInput(newItem) {
    let confirm = this.modal.create(SubmitConfirm, newItem);
    confirm.present();
  }

  formValid() {
    if (this.subform === 'temp' && this.select.selectedValid()) {
      this.invalidForm = false;
    } else {
      this.invalidForm = true;
    }
  }

  nextSlide(prev: boolean) {
    this.steps.lockSwipes(false);
    if (prev) {
      this.steps.slidePrev();
    } else {
      this.steps.slideNext();
    }
  }

  sampleForm() {
    let data = {
      selID: this.select.findSample().id,
      selName: this.select.findSample().name,
      selImg: this.select.findSample().pic
    }
    return data;
  }

  submitItem() {
    let newItem = this.base.itemForm.value;

    newItem['data'] = [
      {
        create: this.base.data.value,
        type: this.subform
      }
    ];
    newItem['flyer'] = this.isFlyer;
    if (!this.invalidForm) {
      newItem['data'].push(this.sampleForm());
    };
    if (this.subform === 'temp' || this.subform === 'new') {
      if (this.samples.detailCheck()) {
        newItem['data'].push(this.samples.detailForm.value);
      };
    };

    if (this.addPic) {
      newItem['pic'] = this.pics.getArt();
    };

    if (this.social) {
      newItem['data'].push(this.social.socialForm.value);
    }

    this.confirmInput(newItem);
  }
}