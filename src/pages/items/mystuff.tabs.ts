import { Component, ViewChild } from '@angular/core';
import { IonicPage, Tabs } from 'ionic-angular';

@IonicPage({
  name: 'my-stuff',
  segment: 'm1'
})
@Component({
  selector: 'tabs-user',
  templateUrl: 'base-items.tabs.html'
})

export class MyStuff {
  @ViewChild('tabs') tabNav: Tabs;
  cardTab: string = 'my-cards';
  flyerTab: string = 'my-flyers';
  title: string = 'My';

  constructor() { }

  ionViewDidEnter() {
    let tab = this.tabNav._tabs[0];
    tab.setRoot('my-cards');
  }
}