import { Component, OnInit } from '@angular/core';
import { Validators, ControlGroup, Control } from '@angular/common';

import { BackandService } from '../../services';
import { FormBase } from './submit-base.form';
import { EbcProduct } from '../shared';

@Component({
  selector: 'ebc-sample-form',
  templateUrl: 'build/pages/submit/submit-sample.form.html',
})

export class SampleForm extends FormBase implements OnInit {
  tempCards: Array<EbcProduct> = [];
  tempFlyers: Array<EbcProduct> = [];
  tempView: string = 'img/default.png';

  constructor(private backand: BackandService) {
    super();
    this.itemForm = new ControlGroup({
      name: this.name,
      desc: this.desc,
      data: this.data,
      pic: this.pic
    })
  }

  ngOnInit() {
    this.getSamples('SampleCard');
    this.getSamples('SampleFlyer');
  }



  findSample() {
    let selected: EbcProduct;
    if (this.isType == 'Flyer') {
      selected = this.tempFlyers.find(select => select.pic == this.tempView);
    }
    if (this.isType == 'Card') {
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

  tempForm() {
    if (this.tempView == 'img/default.png') {
      console.log('Please Select from Templates');
      this.itemForm.setErrors({noTemp: true});
    } else {
      let buildData = {
        selectedId: this.findSample()['id'],
        selectedName: this.findSample()['name']
      }
      this.data.updateValue(JSON.stringify(buildData));
    }
    return this.itemForm.value;
  }
}