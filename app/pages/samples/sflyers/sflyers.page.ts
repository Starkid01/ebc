import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage } from '../../shared';
import { NavComponent } from '../../shared/nav';
import { Backand, Services } from '../../../shared';

@Component({
  templateUrl: 'build/pages/samples/sflyers/sflyers.page.html',
  directives: [NavComponent]
})

export class SFlysPage {
  flyers:Array<any>;

  constructor(public backand:Backand, public services: Services, public nav:NavController) {
    this.sampleCards();
  }

  sampleCards(){
    let samples = 'SampleFlyer';
    this.backand.getItems(samples).subscribe(
      data => {
        this.flyers = data;
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
