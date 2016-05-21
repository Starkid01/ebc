import {Page, IonicApp} from 'ionic-angular';
import {Type} from '@angular/core';
import {MyStuff} from '../mystuff/mystuff';
import {Samples} from '../samples/samples';
import {PersonPage} from '../myperson/myperson';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/sidemenu/sidemenu.html'
})

export class SideMenu {
  pages: Array<{title: string, component: Type}>;;
  homePage: Type = MyStuff;


  constructor(private app: IonicApp, public backand:Backand, public services:Services) {
    this.services.getUser();
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
