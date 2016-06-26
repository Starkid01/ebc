import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Validators, ControlGroup, Control } from '@angular/common';
import { NavController } from 'ionic-angular';

import { BackandService } from '../../services';
import { FormBase } from './submit-base.form';
import { EbcProduct } from '../shared';

@Component({
  selector: 'ebc-sample-form',
  templateUrl: 'build/pages/submit/submit-sample.form.html',
})

export class SampleForm extends FormBase implements DoCheck, OnInit {
  phone: Control = new Control('');
  tempCards: Array<EbcProduct> = [];
  tempFlyers: Array<EbcProduct> = [];
  tempView: string = 'img/default.png';

  constructor(private nav: NavController, private backand: BackandService) {
    super();
    this.itemForm = new ControlGroup({
      name: this.name,
      desc: this.desc,
      data: this.data,
      pic: this.pic
    })
  }

  ngDoCheck() {
    this.selectedValid();
    super.ngDoCheck();
  }

  ngOnInit() {
    this.getSamples('SampleCard');
    this.getSamples('SampleFlyer');
  }

  contactForm() {
    
  }

  findSample() {
    let selected: EbcProduct;
    if (this.isType == 'Flyer') {
      selected = this.tempFlyers.find(select => select.pic == this.tempView);
    }
    else if (this.isType == 'Card') {
      selected = this.tempCards.find(select => select.pic == this.tempView);
    }
    return selected;
  }

  getSamples(type: string) {
    this.backand.getItems(type).subscribe(
      data => {
        if (type == 'SampleCard') {
          this.tempCards = data;
        }
        if (type == 'SampleFlyer') {
          this.tempFlyers = data;
        }
      },
      err => console.log(err)
    );
  }

  selectedValid() {
    let ch = this.findSample() === undefined;
    if (ch) {
      this.itemForm.setErrors({ noTemp: true }, true);
    }
    else {
      this.itemForm.setErrors(null, true);
    }
  }

  tempForm() {
    let buildData: Object;
    if (!this.itemForm.valid) {
      return false;
    }
    else {
      let selected = {
        selectedId: this.findSample()['id'],
        selectedName: this.findSample()['name']
      }
      let myData = JSON.stringify(buildData) + JSON.stringify(selected);
      this.data.updateValue(myData);
      return this.itemForm.value;
    }
  }
}