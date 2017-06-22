import { Component, Type } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { MyCardsPage, MyFlysPage } from './list';

@IonicPage({
  name: 'my-stuff'
})
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