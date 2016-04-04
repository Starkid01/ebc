import {Page} from 'ionic-angular';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/myperson/myperson.html',
  providers: [Backand, Services]
})

export class PersonPage {
  myUser: Object;
  page: string;

constructor(public backand: Backand, public services: Services) {
    this.page = 'My Profile';
    this.services.getAuth();
    this.getUser();
  }

  getUser(){
    this.backand.currentUser().subscribe(
      data => {
        this.backand.auth_status = 'OK';
        this.myUser = data[0];
      },
      err => {
        var errorMessage = this.backand.extractErrorMessage(err);
        this.backand.auth_status = `Error: ${errorMessage}`;
        this.backand.logError(err);
      });
  }
}
