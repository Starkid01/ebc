import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage } from '../../shared';
import { NavComponent } from '../../shared/nav';
import { BackandService } from '../../../services';

@Component({
  templateUrl: 'build/pages/mystuff/mycards/mycards.page.html',
  directives: [NavComponent]
})

export class MyCardsPage {
  cards:Array<any>;
  none:boolean;

  constructor(public backand:BackandService, public nav:NavController) {
    this.myCards();
  }

  ngDoCheck(){
    if(this.cards = []){
      this.none = true;
    } else {
      this.none = false;
    }
  }

  goTo(id:number){
    let item = {
      index: id,
      table: 'items'
    };
    this.nav.push(DetailPage, item);
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
        this.backand.authStatus = `Error: ${errorMessage}`;
        this.backand.logError(err);
      });
  }
}
