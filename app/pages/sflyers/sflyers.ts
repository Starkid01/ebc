import {Page, NavController} from 'ionic-angular';
import {Type} from 'angular2/core';
import {DetailPage} from '../../pages/detail/detail';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/sflyers/sflyers.html'
})

export class SFlysPage {
  flyers:Array<any>;
  detail:Type = DetailPage;

  constructor(public backand:Backand, public services: Services, public nav:NavController) {
    this.services.getAuth();
    this.sampleCards();
  }

  sampleCards(){
    let samples = 'SampleFlyer';
    this.backand.getItems(samples).subscribe(
      data => {
        console.log('Sample Flyers');
        console.log(data);
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
    this.nav.push(this.detail, item);
  }
}
