import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Backand, Services } from '../../../services';
import { NavComponent } from '../../shared/nav';
import { EditPage } from '../editperson';

@Component({
  templateUrl: 'build/pages/profile/myperson/myperson.page.html',
  directives: [NavComponent]
})

export class PersonPage {
  editPage:any = EditPage;

  constructor(private nav:NavController, public backand:Backand, public services:Services) {
  }
}
