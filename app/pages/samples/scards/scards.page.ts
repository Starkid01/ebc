import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage } from '../../shared';
import { NavComponent } from '../../shared/nav';
import { Backand, Services } from '../../../services';

@Component({
  templateUrl: 'build/pages/samples/scards/scards.page.html',
  directives: [NavComponent]
})

export class SCardsPage {
  cards:Array<any>;

  constructor(public backand:Backand, public services: Services, public nav:NavController) {
    this.sampleCards();
  }

  sampleCards(){
    let samples = 'SampleCard';
    this.backand.getItems(samples).subscribe(
      data => {
        this.cards = data;
      },
      err => {
        var errorMessage = this.backand.extractErrorMessage(err);
        this.backand.auth_status = `Error: ${errorMessage}`;
        this.backand.logError(err);
      });
  }

  goTo(id:number){
    let item = {
      index: id,
      table: 'samples'
    };
    this.nav.push(DetailPage, item);
  }
}
