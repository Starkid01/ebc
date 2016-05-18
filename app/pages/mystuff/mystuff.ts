import {Page} from 'ionic-angular';
import {Type, ViewChild} from 'angular2/core';
import {MoreMenu} from '../moremenu/moremenu';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';
import {MyCardsPage} from '../mycards/mycards';
import {MyFlysPage} from '../myflys/myflys';

@Page({
  templateUrl: 'build/pages/mystuff/mystuff.html',
  directives: [MoreMenu]
})

export class MyStuff {
  @ViewChild(MoreMenu) more:MoreMenu;
  cardTab: Type = MyCardsPage;
  flyerTab: Type = MyFlysPage;
  title: string;

  constructor(public services: Services) {
  }

  getTitle(Type) {
    let tab = Type;

    if(tab == MyCardsPage){
      this.title = 'My Cards';
    }
    if(tab == MyFlysPage){
      this.title = 'My Flyers';
    }
  }
}
