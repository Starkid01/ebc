import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import {  BackandItemService, BackandItem } from '../../../providers';

@Component({
  selector: 'ebc-select-form',
  templateUrl: 'submit-select.form.html'
})

export class SelectForm implements DoCheck, OnInit {
	@Input() flyer: boolean;

  tempCards: Array<BackandItem> = [];
  tempFlyers: Array<BackandItem> = [];
  tempView: string = ''; 

  constructor(private nav: NavController, private backand:  BackandItemService) {
  }

  ngDoCheck() {
    this.selectedValid();
  }

  ngOnInit() {
    this.getSamples();
    console.log(this.tempView);
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
     let cards = this.backand.getList('TempCard');
     let flyer = this.backand.getList('TempFlyer');

     this.tempCards = cards['TempCard'];
     this.tempFlyers = flyer['TempFlyer'];
  }

  selectedValid() {
    let ch = this.findSample() === undefined;

		return ch ? false : true;
  }
}