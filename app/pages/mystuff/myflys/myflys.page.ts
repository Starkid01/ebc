import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage } from '../../shared';
import { NavComponent } from '../../shared/nav';
import { Backand, Services } from '../../../services';

@Component({
  templateUrl: 'build/pages/mystuff/myflys/myflys.page.html',
  directives: [NavComponent]
})

export class MyFlysPage {
  flyers:Array<any>;
  none:boolean;

  constructor(public backand:Backand, public services: Services, public nav:NavController) {
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
    this.nav.push(DetailPage, item);
  }
}
