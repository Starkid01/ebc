import { Component, Type } from '@angular/core';

import { SCardsPage, SFlysPage } from './list';

@Component({
  templateUrl: 'build/pages/items/base-items.tabs.html'
})

export class Samples {
  cardTab: Type = SCardsPage;
  flyerTab: Type = SFlysPage;
  title: string = 'Sample';

  constructor() {
  }
}
