import {Page} from 'ionic-framework/ionic';
import {Type} from 'angular2/core';
import {MoreMenu} from '../moremenu/moremenu';
import {SCardsPage} from '../scards/scards';
import {SFlysPage} from '../sflyers/sflyers';

@Page({
  templateUrl: 'build/pages/samples/samples.html',
  directives: [MoreMenu]
})

export class Samples {
  cardTab: Type = SCardsPage;
  flyerTab: Type = SFlysPage;
  title: string;
  hide: boolean;

  constructor(){
    this.hide = true;
  }

  GetTitle(Type) {
    let tab = Type;

    if(tab == SCardsPage){
      this.title = 'Sample Cards';
    }
    if(tab == SFlysPage){
      this.title = 'Sample Flyers';
    }
  }

  More(){
    this.hide = !this.hide;
  }

  HideMore(){
    this.hide = true;
  }
}
