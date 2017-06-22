import { Component, Type } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { SCardsPage, SFlysPage } from './list';

@IonicPage({
  name: 'samples'
})
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