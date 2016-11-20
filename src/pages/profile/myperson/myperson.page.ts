import { Component, Type } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BackandService, UserService } from '../../../providers';
import { EditPage } from '../editperson';

@Component({
  selector: 'page-person',
  templateUrl: 'myperson.page.html'
})

export class PersonPage {
  editPage: Type<EditPage> = EditPage;

  constructor(private nav: NavController, public user: UserService) {
  }
}
