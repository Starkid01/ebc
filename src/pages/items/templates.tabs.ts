import { Component, Type } from '@angular/core';

import { TCardsPage, TFlysPage } from './list';

@Component({
  selector: 'tabs-templates',
  templateUrl: 'base-items.tabs.html'
})

export class Templates {
  cardTab: Type<TCardsPage> = TCardsPage;
  flyerTab: Type<TFlysPage> = TFlysPage;
  title: string = 'Template';

  constructor() {
  }
}