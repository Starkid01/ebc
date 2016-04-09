import {FORM_DIRECTIVES, Validators, ControlGroup, Control} from 'angular2/common';
import {Page} from 'ionic-angular';
import {MoreMenu} from '../moremenu/moremenu';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/editperson/editperson.html',
  providers: [Backand, Services],
  directives: [FORM_DIRECTIVES, MoreMenu]
})

export class EditPage {
  section:string;

  constructor(public backand: Backand, public services: Services) {
    this.services.getAuth();
    this.services.getUser();
    this.section = 'user';
  }

  ngDoChange(){
    console.log(this.section);
    console.log('change');
  }
}
