import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/myperson/myperson.html'
})

export class PersonPage {
  page: string;

  constructor() {
    this.page = 'My Profile';
  }
}
