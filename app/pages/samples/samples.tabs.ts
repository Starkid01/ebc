import { Component, Type} from '@angular/core';

import { SCardsPage } from './scards';
import { SFlysPage } from './sflyers';

@Component({
  templateUrl: 'build/pages/samples/samples.tabs.html'
})

export class Samples {
  cardTab:Type = SCardsPage;
  flyerTab:Type = SFlysPage;

  constructor(){
  }
}
