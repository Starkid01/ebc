import { Component, Type } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MyStuff, Samples, Templates } from '../../items';
import { PersonPage } from '../../profile';
import { SubmitPage } from '../../submit';

interface Page {
  title: string;
  component: Type<any>;
}

@Component({
  selector: 'page-sidemenu',
  templateUrl: 'sidemenu.html'
})

export class SideMenu {
  pages: Array<Page>;
  homePage: Type<Component> = MyStuff;

  constructor(public nav: NavController) {
    this.pages = [
      { title: 'EBC Samples', component: Samples },
      { title: 'My EBC', component: MyStuff },
      { title: 'My Profile', component: PersonPage },
      { title: 'Templates', component: Templates },
      { title: 'Submit Item', component: SubmitPage }
    ];
  }

  toPages(page) {
    this.nav.getActiveChildNav().setPages([page.component]);
  }
}
