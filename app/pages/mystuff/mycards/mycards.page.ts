import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage } from '../../shared';
import { NavComponent } from '../../shared/nav';
import { Backand, Services } from '../../../services';

@Component({
  templateUrl: 'build/pages/mystuff/mycards/mycards.page.html',
  directives: [NavComponent]
})

export class MyCardsPage {
  cards:Array<any>;
  none:boolean;

  constructor(public backand:Backand, public services: Services, public nav:NavController) {
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
    this.nav.push(DetailPage, item);
  }
}
