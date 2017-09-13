import { Component, ViewChild } from '@angular/core';
import { IonicPage, Tabs } from 'ionic-angular';

@IonicPage({
  name: 'templates',
  segment: 't3'
})
@Component({
  selector: 'tabs-templates',
  templateUrl: 'base-items.tabs.html'
})

export class Templates {
  @ViewChild('tabs') tabNav: Tabs;
  cardTab: string = 'template-cards';
  flyerTab: string = 'template-flyers';
  title: string = 'Template';

  constructor() { }

  ionViewDidEnter() {
    let tab = this.tabNav._tabs[0];
    tab.setRoot('template-cards');
  }
}