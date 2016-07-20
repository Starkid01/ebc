import { Component, DoCheck, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage, EbcProduct } from '../../shared';
import { NavComponent } from '../../shared/nav';
import { BackandService } from '../../../services';

@Component({
  templateUrl: 'build/pages/mystuff/mycards/mycards.page.html',
  directives: [NavComponent]
})

export class MyCardsPage implements DoCheck, OnInit {
  cards: Array<EbcProduct>;
  none: boolean;

  constructor(public backand: BackandService, public nav: NavController) {
    
  }

  ngDoCheck(){
    if(this.cards == undefined ||  this.cards.length == 0){
      this.none = true;
    } else{
      this.none = false;
    }
  }

  ngOnInit() {
    this.myCards();
  }

  goTo(id: number) {
    let item = {
      index: id,
      table: 'items'
    };
    this.nav.push(DetailPage, item);
  }

  myCards() {
    let items = 'MyCard';
    this.backand.getItems(items).subscribe(
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