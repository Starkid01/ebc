import {Page} from 'ionic-angular';
import {Type} from 'angular2/core';
import {MoreMenu} from '../moremenu/moremenu';
import {MyCardsPage} from '../mycards/mycards';
import {MyFlysPage} from '../myflys/myflys';

@Page({
  templateUrl: 'build/pages/mystuff/mystuff.html',
  directives: [MoreMenu]
})

export class MyStuff {
  cardTab: Type = MyCardsPage;
  flyerTab: Type = MyFlysPage;
  title: string;
  hide: boolean;

  constructor(){
    this.hide = true;
  }

  GetTitle(Type) {
    let tab = Type;

    if(tab == MyCardsPage){
      this.title = 'My Cards';
    }
    if(tab == MyFlysPage){
      this.title = 'My Flyers';
    }
  }

  More(){
    this.hide = !this.hide;
  }

  HideMore(){
    this.hide = true;
  }
}
