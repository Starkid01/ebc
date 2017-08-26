import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'samples',
  segment: 's0'
})
@Component({
  selector: 'tabs-samples',
  templateUrl: 'base-items.tabs.html'
})
export class Samples {
  cardTab: string = 'sample-cards';
  flyerTab: string = 'sample-flyers';
  title: string = 'Sample';

  constructor() { }
}