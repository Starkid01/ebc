import { Component, Type } from '@angular/core';

import { MyCardsPage, MyFlysPage } from './list';

@Component({
  selector: 'tabs-user',
  templateUrl: 'base-items.tabs.html'
})

export class MyStuff {
  cardTab: Type<MyCardsPage> = MyCardsPage;
  flyerTab: Type<MyFlysPage> = MyFlysPage;
  title: string = 'My';

  constructor() {
  }
}