import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'my-stuff',
  segment: 'my-stuff'
})
@Component({
  selector: 'tabs-user',
  templateUrl: 'base-items.tabs.html'
})

export class MyStuff {
  cardTab: string = 'my-cards';
  flyerTab: string = 'my-flyers';
  title: string = 'My';

  constructor() {
  }
}