import { Validators, ControlGroup, Control } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';

import { BackandService } from '../../services';
import { NavComponent } from '../shared/nav';
import { EbcProduct } from '../shared';

@Component({
  templateUrl: 'build/pages/submit/submit.page.html',
  directives: [NavComponent]
})

export class SubmitPage implements DoCheck, OnInit {
  flyer: Control = new Control('');
  isFlyer: boolean = false;
  itemForm: ControlGroup;
  isType: string = 'Card';
  media: Control = new Control('');
  name: Control = new Control('', Validators.required);
  subform: string = 'sample';
  tempCards: Array<EbcProduct>;
  tempFlyers: Array<EbcProduct>;
  tempView: string = 'img/default.png';

  constructor(private backand: BackandService) {
    this.itemForm = new ControlGroup({
      name: this.name,
      flyer: this.flyer,
      media: this.media
    })
  }

  ngDoCheck() {
    if (this.isFlyer) {
      this.isType = 'Flyer';
    } else {
      this.isType = 'Card';
    }
  }

  ngOnInit() {
    this.getSamples('SampleCard');
    this.getSamples('SampleFlyer');
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
}
