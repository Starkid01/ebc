import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage, EbcProduct } from '../../shared';
import { NavComponent } from '../../shared/nav';
import { BackandService } from '../../../services';

@Component({
  templateUrl: 'build/pages/samples/scards/scards.page.html',
  directives: [NavComponent]
})

export class SCardsPage implements OnInit {
  cards: Array<EbcProduct>;

  constructor(public backand: BackandService, public nav: NavController) {
  }

  ngOnInit() {
    this.sampleCards();
  }

  goTo(id: number) {
    let item = {
      index: id,
      table: 'samples'
    };
    this.nav.push(DetailPage, item);
  }

  sampleCards() {
    let samples = 'SampleCard';
    this.backand.getItems(samples).subscribe(
      data => {
        this.cards = data;
      },
      err => {
        var errorMessage = this.backand.extractErrorMessage(err);
        this.backand.authStatus = `Error: ${errorMessage}`;
        this.backand.logError(err);
      });
  }
}