import {Page, NavParams} from 'ionic-angular';
import {MoreMenu} from '../moremenu/moremenu';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/detail/detail.html',
  providers: [Backand, Services, MoreMenu]
})
export class DetailPage {
  item:Object;
  hide: boolean;

  constructor(public backand: Backand, public services: Services, public params:NavParams) {
    this.hide = true;
    this.params = params;
    this.services.getAuth();
    this.itemDetail();
  }

  itemDetail(){
    let obj = this.params.get('table');
    let id = this.params.get('index');

    this.backand.getItem(obj, id).subscribe(
      data => {
        console.log('Sample Card');
        console.log(data);
        this.item = data;
      },
      err => {
        var errorMessage = this.backand.extractErrorMessage(err);
        this.backand.auth_status = `Error: ${errorMessage}`;
        this.backand.logError(err);
      });
  }

  More() {
    this.hide = !this.hide;
  }

   HideMore() {
    this.hide = true;
  }
}
