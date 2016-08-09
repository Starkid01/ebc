import { Component, Type } from '@angular/core';

import { TCardsPage, TFlysPage } from './list';

@Component({
  templateUrl: 'build/pages/items/base-items.tabs.html'
})

export class Templates {
  cardTab: Type = TCardsPage;
  flyerTab: Type = TFlysPage;
  title: string = 'Template';

  constructor() {
  }
}