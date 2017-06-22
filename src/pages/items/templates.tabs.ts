import { Component, Type } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { TCardsPage, TFlysPage } from './list';

@IonicPage({
  name: 'templates'
})
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