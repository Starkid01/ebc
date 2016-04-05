import {Page, NavParams} from 'ionic-angular';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/detail/detail.html',
  providers: [Backand, Services]
})
export class DetailPage {
  item:Object;
  id:number:

constructor(public backand: Backand, public services: Services, public params:NavParams) {
    this.params = params;
    this.id = this.params.get('index');
    this.services.getAuth();
    this.itemDetail();
  }

  itemDetail(){
    let obj = 'samples';

    this.backand.getItem(obj, this.id).subscribe(
      data => {
        console.log('Sample Card');
        console.log(data);
        this.item = data;
      },
      err => {
        var errorMessage = this.backand.extractErrorMessage(err);
        this.backand.auth_status = `Error: ${errorMessage}`;
        this.backand.logError(err);
      });.
  }
}
