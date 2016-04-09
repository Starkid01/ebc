import {Page, IonicApp} from 'ionic-angular';
import {Type} from 'angular2/core';
import {MyStuff} from '../mystuff/mystuff';
import {Samples} from '../samples/samples';
import {PersonPage} from '../myperson/myperson';

@Page({
  templateUrl: 'build/pages/sidemenu/sidemenu.html'
})

export class SideMenu {
  pages: Array<{title: string, component: Type}>;;
  homePage: Type = MyStuff;


  constructor(private app: IonicApp) {
    this.pages = [
      {title: 'EBC Samples', component: Samples},
      {title: 'My Stuff', component: MyStuff},
      {title: 'My Profile', component: PersonPage}
    ];
  }

  toPages(page){
    this.homePage = page.component;
  }
}
