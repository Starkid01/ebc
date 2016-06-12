import { Component, Type } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BackandService, UserService } from '../../../services';
import { NavComponent } from '../../shared/nav';
import { EditPage } from '../editperson';

@Component({
  templateUrl: 'build/pages/profile/myperson/myperson.page.html',
  directives: [NavComponent]
})

export class PersonPage {
  editPage:Type = EditPage;

  constructor(private nav:NavController, public user:UserService) {
  }
}
