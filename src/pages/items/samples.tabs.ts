import { Component, Type } from '@angular/core';

import { SCardsPage, SFlysPage } from './list';

@Component({
  selector: 'tabs-samples',
  templateUrl: 'base-items.tabs.html'
})

export class Samples {
  cardTab: Type<SCardsPage> = SCardsPage;
  flyerTab: Type<SFlysPage> = SFlysPage;
  title: string = 'Sample';

  constructor() {
  }
}