import {Page} from 'ionic-angular';
import {Type, ViewChild} from 'angular2/core';
import {MoreMenu} from '../moremenu/moremenu';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';
import {SCardsPage} from '../scards/scards';
import {SFlysPage} from '../sflyers/sflyers';

@Page({
  templateUrl: 'build/pages/samples/samples.html',
  directives: [MoreMenu]
})

export class Samples {
  @ViewChild(MoreMenu) more:MoreMenu;
  cardTab: Type = SCardsPage;
  flyerTab: Type = SFlysPage;
  title: string;

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
