import {Page, NavController} from 'ionic-angular';
import {Type, ViewChild} from '@angular/core';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';
import {MoreMenu} from '../moremenu/moremenu';
import {EditPage} from '../editperson/editperson';

@Page({
  templateUrl: 'build/pages/myperson/myperson.html',
  directives: [MoreMenu]
})

export class PersonPage {
  @ViewChild(MoreMenu) more:MoreMenu;
  edit:Type = EditPage;

  constructor(private nav:NavController, public backand:Backand, public services:Services) {
  }

  editInfo() {
    this.nav.push(this.edit);
  }
}
