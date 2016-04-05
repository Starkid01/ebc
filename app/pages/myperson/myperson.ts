import {Page} from 'ionic-angular';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/myperson/myperson.html',
  providers: [Backand, Services]
})

export class PersonPage {

  constructor(public backand: Backand, public services: Services) {
    this.services.getAuth();
    this.services.getUser();
  }
}
