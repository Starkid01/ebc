import { Component, ViewChild } from '@angular/core';
import { IonicPage, Tabs } from 'ionic-angular';

@IonicPage({
  name: 'samples',
  segment: 's0'
})
@Component({
  selector: 'tabs-samples',
  templateUrl: 'base-items.tabs.html'
})
export class Samples {
  @ViewChild('tabs') tabNav: Tabs;
  cardTab: string = 'sample-cards';
  flyerTab: string = 'sample-flyers';
  title: string = 'Sample';

  constructor() { }

  ionViewDidEnter() {
    let tab = this.tabNav._tabs[0];
    tab.setRoot('sample-cards');
  }
}