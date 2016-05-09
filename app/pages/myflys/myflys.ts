import {Page, NavController} from 'ionic-angular';
import {Type} from 'angular2/core';
import {DetailPage} from '../../pages/detail/detail';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/myflys/myflys.html',
  providers: [Backand, Services]
})

export class MyFlysPage {
  flyers:Array<any>;
  detail:Type = DetailPage;
  none:boolean;

  constructor(public backand:Backand, public services: Services, public nav:NavController) {
    this.services.getAuth();
    this.myFlyers();
  }

  ngDoCheck(){
    if(this.flyers = []){
      this.none = true;
    } else{
      this.none = false;
    }
  }

  myFlyers(){
    let items = 'MyFlyer';
    this.backand.getItems(items).subscribe(
      data => {
        console.log('My Flyers');
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
      table: 'items'
    };
    this.nav.push(this.detail, item);
  }
}
