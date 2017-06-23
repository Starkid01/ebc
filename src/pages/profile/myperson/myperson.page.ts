import { Component, Type } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { UserService } from '../../../providers/myservices';
import { EditPage } from '../editperson';

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

  constructor(private nav: NavController, private user: UserService) {
  }
}
