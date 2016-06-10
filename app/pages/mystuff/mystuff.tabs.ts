import { Component, Type } from '@angular/core';

import { Backand, Services } from '../../shared';
import { NavComponent } from '../shared/nav';
import { MyCardsPage } from './mycards';
import { MyFlysPage } from './myflys';

@Component({
  templateUrl: 'build/pages/mystuff/mystuff.tabs.html',
  directives: [NavComponent]
})

export class MyStuff {
  cardTab: Type = MyCardsPage;
  flyerTab: Type = MyFlysPage;
  title: string;

  constructor(public services: Services) {
  }

  getTitle(Type) {
    let tab = Type;

    if(tab == MyCardsPage){
      this.title = 'My Cards';
    }
    if(tab == MyFlysPage){
      this.title = 'My Flyers';
    }
  }
}
