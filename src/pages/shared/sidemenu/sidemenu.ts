import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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
  pages: Array<Page>;
  homePage: string = 'my-stuff';

  constructor(public nav: NavController) {
    this.pages = [
      { title: 'EBC Samples', component: 'samples' },
      { title: 'My EBC', component: 'my-stuff' },
      { title: 'My Profile', component: 'profile' },
      { title: 'Templates', component: 'templates' },
      { title: 'Submit Item', component: 'submit' }
    ];
  }

  toPages(page) {
    this.nav.getActiveChildNav().setPages([page.component]);
  }
}
