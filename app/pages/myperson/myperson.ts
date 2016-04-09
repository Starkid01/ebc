import {Page, NavController} from 'ionic-angular';
import {NgStyle} from 'angular2/common';
import {Type} from 'angular2/core';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';
import {MoreMenu} from '../moremenu/moremenu';
import {EditPage} from '../editperson/editperson';

@Page({
  templateUrl: 'build/pages/myperson/myperson.html',
  providers: [Backand, Services],
  directives: [MoreMenu, NgStyle]
})

export class PersonPage {
  edit:Type = EditPage;

  constructor(private nav: NavController, public backand: Backand, public services: Services) {
    this.nav = nav;
    this.services.getAuth();
    this.services.getUser();
  }

  editInfo() {
    this.nav.push(this.edit);
  }
}
