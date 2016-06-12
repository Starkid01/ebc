import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage } from '../../shared';
import { NavComponent } from '../../shared/nav';
import { BackandService } from '../../../services';

@Component({
  templateUrl: 'build/pages/mystuff/myflys/myflys.page.html',
  directives: [NavComponent]
})

export class MyFlysPage {
  flyers:Array<any>;
  none:boolean;

  constructor(public backand:BackandService, public nav:NavController) {
    this.myFlyers();
  }

  ngDoCheck(){
    if(this.flyers = []){
      this.none = true;
    } else{
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

  myFlyers(){
    let items = 'MyFlyer';
    this.backand.getItems(items).subscribe(
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
