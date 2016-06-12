import { Component, Type } from '@angular/core';

//import { Backand, Services } from '../../services';
import { MyCardsPage } from './mycards';
import { MyFlysPage } from './myflys';

@Component({
  templateUrl: 'build/pages/mystuff/mystuff.tabs.html'
})

export class MyStuff {
  cardTab: Type = MyCardsPage;
  flyerTab: Type = MyFlysPage;
  constructor() {
  }
}
