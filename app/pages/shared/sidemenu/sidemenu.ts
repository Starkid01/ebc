import { Component, Type } from '@angular/core';

import { BackandService, UserService } from '../../../services';
import { MyStuff, Samples } from '../../items';
import { PersonPage } from '../../profile';
import { SubmitPage } from '../../submit';

interface Page {
  title: string;
  component: Type;
}

@Component({
  templateUrl: 'build/pages/shared/sidemenu/sidemenu.html'
})

export class SideMenu {
  pages: Array<Page>;
  homePage: Type = MyStuff;


  constructor(private user: UserService) {
    this.user.getUser();
    this.pages = [
      { title: 'EBC Samples', component: Samples },
      { title: 'My Stuff', component: MyStuff },
      { title: 'My Profile', component: PersonPage },
      { title: 'Submit Item', component: SubmitPage }
    ];
  }

  toPages(page) {
    this.homePage = page.component;
  }
}
