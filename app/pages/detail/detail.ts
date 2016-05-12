import {FORM_DIRECTIVES, Validators, ControlGroup, Control} from 'angular2/common';
import {Page, NavParams} from 'ionic-angular';
import {MoreMenu} from '../moremenu/moremenu';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/detail/detail.html',
  directives: [MoreMenu, FORM_DIRECTIVES]
})
export class DetailPage {
  emailForm:ControlGroup;
  smsForm:ControlGroup;
  phone:Control = new Control('');
  text:Control = new Control('');
  email:Control = new Control('', this.services.emailValidator);
  item:Object;
  hide:boolean;
  message:string = '';
  customField:string;

  constructor(public backand:Backand, public services:Services, public params:NavParams) {
    this.hide = true;
    this.params = params;
    this.itemDetail();
    this.smsForm = new ControlGroup({
      phone: this.phone,
      text: this.text
    });

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

  userAdded(value) {
    this.customField = value;
  }

  sendSms(form) {
    let mySms = form.value;

    console.log(mySms);
  }

  sendEmail(form) {
    let myEmail = form.value;

    console.log(myEmail);
  }

  getContact() {
    console.log('Working at it');
  }

  more() {
    this.hide = !this.hide;
  }

   hideMore() {
    this.hide = true;
  }
}
