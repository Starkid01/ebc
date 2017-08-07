import { Component, OnInit } from '@angular/core';
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

export class SideMenu implements OnInit  {
   pages: Array<Page> = [
    { title: 'EBC Samples', component: 'samples' },
    { title: 'My EBC', component: 'my-stuff' },
    { title: 'My Profile', component: 'profile' },
    { title: 'Templates', component: 'templates' },
    { title: 'Submit Item', component: 'submit' }
  ];
  hom
  homePage: string = 'my-stuff';

  constructor(public nav: NavController) { }

  ngOnInit() {
    this.nav.getActiveChildNavs()[0].id = 'side';
  }

  toPages(page) {
    this.nav.getActiveChildNavs()[0].setPages([page.component]);
  }
}
