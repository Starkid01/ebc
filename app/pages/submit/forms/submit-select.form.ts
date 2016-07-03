import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Validators, ControlGroup, Control } from '@angular/common';
import { NavController } from 'ionic-angular';

import { BackandService } from '../../../services';
import { EbcProduct } from '../../shared';

@Component({
  selector: 'ebc-select-form',
  templateUrl: 'build/pages/submit/forms/submit-select.form.html'
})

export class SelectForm implements DoCheck, OnInit {
	@Input() flyer: boolean;

  tempCards: Array<EbcProduct> = [];
  tempFlyers: Array<EbcProduct> = [];
  tempView: string;

  constructor(private nav: NavController, private backand: BackandService) {
  }

  ngDoCheck() {
    this.selectedValid();
  }

  ngOnInit() {
    this.getSamples('SampleCard');
    this.getSamples('SampleFlyer');
    console.log(this.tempView);
  }

  findSample() {
    let selected: EbcProduct;
    if (this.flyer) {
      selected = this.tempFlyers.find(select => select.pic == this.tempView);
    }
    else if (!this.flyer) {
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

		return ch ? false : true;
  }
}