import { Component, Type} from '@angular/core';

import { Backand, Services } from '../../services';
import { SCardsPage } from './scards';
import { SFlysPage } from './sflyers';

@Component({
  templateUrl: 'build/pages/samples/samples.tabs.html'
})

export class Samples {
  cardTab:Type = SCardsPage;
  flyerTab:Type = SFlysPage;
  title:string;

  constructor(public services: Services){
  }

  getTitle(Type) {
    let tab = Type;

    if(tab == SCardsPage){
      this.title = 'Sample Cards';
    }
    if(tab == SFlysPage){
      this.title = 'Sample Flyers';
    }
  }
}
