import {Page, NavController} from 'ionic-angular';
import {Type} from 'angular2/core':
import {DetailPage} from '../../pages/detail/detail';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/scards/scards.html',
  providers: [Backand, Services]
})

export class SCardsPage {
  cards:Array<any>;
  detail:Type = DetailPage;

  constructor(public backand: Backand, public services: Services, public nav:NavController) {
    this.nav = nav;
    this.services.getAuth();
    this.sampleCards();
  }

  sampleCards(){
    let samples = 'SampleCard';
    this.backand.getItems(samples).subscribe(
      data => {
        console.log('Sample Cards');
        console.log(data);
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
      index: id
    };
    this.nav.push(this.detail, item);
  }
}
