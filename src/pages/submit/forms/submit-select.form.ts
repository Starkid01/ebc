import { Component, DoCheck, Input, OnInit } from '@angular/core';

import { BackandItemService, BackandItem } from '../../../providers';

@Component({
  selector: 'ebc-select-form',
  templateUrl: 'submit-select.form.html'
})

export class SelectForm implements DoCheck, OnInit {
	@Input() flyer: boolean;

  tempCards: Array<BackandItem> = [];
  tempFlyers: Array<BackandItem> = [];
  tempView: string = ''; 

  constructor(private backand:  BackandItemService) {
  }

  ngDoCheck() {
    this.selectedValid();
  }

  ngOnInit() {
    this.getSamples();
  }

  findSample() {
    let selected: BackandItem;
    if (this.flyer) {
      selected = this.tempFlyers.find(select => select.pic === this.tempView);
    } else if (!this.flyer) {
      selected = this.tempCards.find(select => select.pic === this.tempView);
    }
    return selected;
  }

  getSamples() {
     this.backand.getList('TempCard')
     .then(data => {
       this.tempCards = data;
     });
     this.backand.getList('TempFlyer')
     .then(data => {
       this.tempFlyers = data;
     });
  }

  selectedValid() {
    let ch = this.findSample() === undefined;

		return ch ? false : true;
  }
}