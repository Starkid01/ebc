import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'templates',
  segment: 't3'
})
@Component({
  selector: 'tabs-templates',
  templateUrl: 'base-items.tabs.html'
})

export class Templates {
  cardTab: string = 'template-cards';
  flyerTab: string = 'template-flyers';
  title: string = 'Template';

  constructor() {
  }
}