import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'profile',
  segment: ''
})
@Component({
  selector: 'page-person',
  templateUrl: 'myperson.page.html'
})

export class PersonPage {
  editPage: string = 'edit';

  constructor() {
  }
}
