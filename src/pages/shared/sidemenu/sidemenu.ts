import { Component, OnInit } from '@angular/core';
import { Events, IonicPage } from 'ionic-angular';

interface Page {
  title: string;
  component: string;
}

@IonicPage({
  name: 'menu',
  segment: 'menu'
})
@Component({
  selector: 'page-sidemenu',
  templateUrl: 'sidemenu.html'
})

export class SideMenu {
  pages: Array<Page> = [
    { title: 'EBC Samples', component: 'samples' },
    { title: 'My EBC', component: 'my-stuff' },
    { title: 'My Profile', component: 'profile' },
    { title: 'Templates', component: 'templates' },
    { title: 'Submit Item', component: 'submit' }
  ];
  homePage: string = 'my-stuff';

  constructor(private events: Events) { }

  ngOnInit() {
    this.events.subscribe('ebc-submit', () => {
      this.homePage = 'my-stuff';
    })
  }

  toPages(page) {
    this.homePage = page.component;
  }
}
