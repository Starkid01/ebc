import { Component, OnInit } from '@angular/core';
import { Events, IonicPage } from 'ionic-angular';

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
  
  constructor(private events: Events, private user: UserService) { }

  ngOnInit() {
    this.parseUser();
    this.watchUpdate();
  }

  private parseUser() {
    this.user.getUser()
    .then(user => this.userData = user);
  }

  private watchUpdate() {
    this.events.subscribe('myUser', () => {
      this.parseUser();
    })
  }
}
