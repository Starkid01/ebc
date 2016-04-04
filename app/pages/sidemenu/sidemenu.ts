import {Page, IonicApp} from 'ionic-angular';
import {Type} from 'angular2/core';
import {Backand} from '../../components/backand/backand';
import {MyStuff} from '../mystuff/mystuff';
import {Samples} from '../samples/samples';
import {Profile} from '../profile/profile';

@Page({
  templateUrl: 'build/pages/sidemenu/sidemenu.html',
  providers: [Backand]
})

export class SideMenu {
  pages: Array<{title: string, component: Type}>;;
  homePage: Type = MyStuff;


  constructor(private app: IonicApp, public backand: Backand) {
    this.pages = [
      {title: 'EBC Samples', component: Samples},
      {title: 'My Stuff', component: MyStuff},
      {title: 'My Profile', component: Profile}
    ];
  }

  toPages(page){
    this.homePage = page.component;
  }
}
