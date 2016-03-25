import {Page, IonicApp} from 'ionic-angular';
import {Type} from 'angular2/core';
import {MyStuff} from '../mystuff/mystuff';
import {Samples} from '../samples/samples';
import {Profile} from '../profile/profile';

@Page({
  templateUrl: 'build/pages/sidemenu/sidemenu.html'
})

export class SideMenu {
  homePage: Type = MyStuff;
  pages: Array<{title: string, component: Type}>;

  constructor(private app: IonicApp) {
    this.pages = [
      {title: 'EBC Samples', component: Samples},
      {title: 'My Stuff', component: MyStuff},
      {title: 'My Profile', component: Profile}
    ];
  }

  toPages(page){
    let nav = this.app.getComponent('page');
    nav.setRoot(page.component);
  }
}
