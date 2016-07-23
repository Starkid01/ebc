import { Component, Type } from '@angular/core';

import { MyCardsPage, MyFlysPage } from './list';

@Component({
  templateUrl: 'build/pages/shared/items/base-items.tabs.html'
})

export class MyStuff {
  cardTab: Type = MyCardsPage;
  flyerTab: Type = MyFlysPage;

  constructor() {
  }
}
