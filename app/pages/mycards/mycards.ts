import {Page, NavController} from 'ionic-angular';
import {Type} from 'angular2/core';
import {DetailPage} from '../../pages/detail/detail';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/mycards/mycards.html'
})

export class MyCardsPage {
  cards:Array<any>;
  detail:Type = DetailPage;
  none:boolean;

  constructor(public backand:Backand, public services: Services, public nav:NavController) {
    this.services.getAuth();
    this.myCards();
  }

  ngDoCheck(){
    if(this.cards = []){
      this.none = true;
    } else {
      this.none = false;
    }
  }

  myCards(){
    let items = 'MyCard';
    this.backand.getItems(items).subscribe(
      data => {
        console.log('My Cards');
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
      index: id,
      table: 'items'
    };
    this.nav.push(this.detail, item);
  }
}
