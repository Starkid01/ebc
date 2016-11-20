import { Component, Type } from '@angular/core';

import { UserService } from '../../../providers';
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
  homePage: Type<MyStuff> = MyStuff;


  constructor(private user: UserService) {
    this.user.getUser();
    this.pages = [
      { title: 'EBC Samples', component: Samples },
      { title: 'My Stuff', component: MyStuff },
      { title: 'My Profile', component: PersonPage },
      { title: 'Templates', component: Templates },
      { title: 'Submit Item', component: SubmitPage }
    ];
  }

  toPages(page) {
    this.homePage = page.component;
  }
}
