import { Component, Type } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from '../../../providers/myservices';
import { EditPage } from '../editperson';

@Component({
  selector: 'page-person',
  templateUrl: 'myperson.page.html'
})

export class PersonPage {
  editPage: Type<EditPage> = EditPage;

  constructor(private nav: NavController, private user: UserService) {
  }
}
