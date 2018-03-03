import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BackandUser } from '../../../providers/backand';
import { UserService } from '../../../providers/myservices';

@IonicPage({
  name: 'profile',
  segment: 'profile'
})
@Component({
  selector: 'page-person',
  templateUrl: 'myperson.page.html'
})

export class PersonPage implements OnInit {
  editPage: string = 'edit';
  userData: BackandUser;
  
  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getUser()
    .then(user => this.userData = user);
  }
}
