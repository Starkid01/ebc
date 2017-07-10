import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BackandUser } from '../../../providers/backand';
import { UserService } from '../../../providers/myservices';

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
  userData: BackandUser = this.user['myUser']

  constructor(private user: UserService) { }
}
