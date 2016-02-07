import {Page} from 'ionic-framework/ionic';
import {Type} from 'angular2/core';
import {MyCardsPage} from '../mycards/mycards';
import {MyFlysPage} from '../myflys/myflys';

@Page({
  templateUrl: 'build/pages/mystuff/mystuff.html'
})

export class MyStuff {
  cardTab: Type = MyCardsPage;
  flyerTab: Type = MyFlysPage;

  constructor(){

  }
}
