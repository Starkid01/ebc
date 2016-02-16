import {Page} from 'ionic-framework/ionic';

@Page({
  templateUrl: 'build/pages/myperson/myperson.html'
})

export class PersonPage {
  page: string;

  constructor() {
    this.page = 'My Profile';
  }
}
