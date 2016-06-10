import { Component, Type } from '@angular/core';

import { Backand, Services } from '../../../shared';
import { MyStuff } from '../../mystuff';
import { Samples } from '../../samples';
import { PersonPage } from '../../profile';
import { SubmitPage } from '../../submit';

@Component({
  templateUrl: 'build/pages/shared/sidemenu/sidemenu.html'
})

export class SideMenu {
  pages: Array<{title: string, component: Type}>;;
  homePage: Type = MyStuff;


  constructor(public backand:Backand, public services:Services) {
    this.services.getUser();
    this.pages = [
      {title: 'EBC Samples', component: Samples},
      {title: 'My Stuff', component: MyStuff},
      {title: 'My Profile', component: PersonPage},
      {title: 'Submit Item', component: SubmitPage}
    ];
  }

  toPages(page){
    this.homePage = page.component;
  }
}
