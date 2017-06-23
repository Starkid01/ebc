import { Component, Type } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { SCardsPage, SFlysPage } from './list';

@IonicPage({
  name: 'samples',
  segment: 'samples'
})
@Component({
  selector: 'tabs-samples',
  templateUrl: 'base-items.tabs.html'
})

export class Samples {
  cardTab: string = 'sample-cards';
  flyerTab: string = 'sample-flyers';
  title: string = 'Sample';

  constructor() {
  }
}