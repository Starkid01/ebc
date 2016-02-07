import {Page} from 'ionic-framework/ionic';
import {Type} from 'angular2/core';
import {SCardsPage} from '../scards/scards';
import {SFlysPage} from '../sflyers/sflyers';

@Page({
  templateUrl: 'build/pages/samples/samples.html'
})

export class Samples {
  cardTab: Type = SCardsPage;
  flyerTab: Type = SFlysPage;

  constructor(){

  }
}
