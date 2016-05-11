import {Page, NavParams} from 'ionic-angular';
import {MoreMenu} from '../moremenu/moremenu';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/detail/detail.html',
  directives: [MoreMenu]
})
export class DetailPage {
  item:Object;
  hide:boolean;
  message:string = '';

  constructor(public backand:Backand, public services:Services, public params:NavParams) {
    this.hide = true;
    this.params = params;
    this.itemDetail();
  }

  itemDetail(){
    let obj = this.params.get('table');
    let id = this.params.get('index');

    this.backand.getItem(obj, id).subscribe(
      data => {
        this.item = data;
      },
      err => {
        var errorMessage = this.backand.extractErrorMessage(err);
        this.backand.auth_status = `Error: ${errorMessage}`;
        this.backand.logError(err);
      });
  }

  GetContact() {
    console.log('Working at it');
  }

  More() {
    this.hide = !this.hide;
  }

   HideMore() {
    this.hide = true;
  }
}
