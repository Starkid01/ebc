import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage, EbcProduct } from '../../shared';
import { NavComponent } from '../../shared/nav';
import { BackandService } from '../../../services';

@Component({
  templateUrl: 'build/pages/samples/sflyers/sflyers.page.html',
  directives: [NavComponent]
})

export class SFlysPage implements OnInit {
  flyers:Array<EbcProduct>;

  constructor(public backand:BackandService, public nav:NavController) {
  }

  ngOnInit(){
    this.sampleCards();
  }

  goTo(id:number){
    let item = {
      index: id,
      table: 'samples'
    };
    this.nav.push(DetailPage, item);
  }

  sampleCards(){
    let samples = 'SampleFlyer';
    this.backand.getItems(samples).subscribe(
      data => {
        this.flyers = data;
      },
      err => {
        var errorMessage = this.backand.extractErrorMessage(err);
        this.backand.authStatus = `Error: ${errorMessage}`;
        this.backand.logError(err);
      });
  }
}
