import {FORM_DIRECTIVES, Validators, ControlGroup, Control} from 'angular2/common';
import {ViewChild} from 'angular2/core';
import {Page, NavParams} from 'ionic-angular';
import {Contacts} from 'ionic-native';
import {MoreMenu} from '../moremenu/moremenu';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/detail/detail.html',
  directives: [MoreMenu, FORM_DIRECTIVES]
})

export class DetailPage {
  @ViewChild(MoreMenu) more:MoreMenu;
  emailForm:ControlGroup;
  smsForm:ControlGroup;
  phone:Control = new Control('');
  text:Control = new Control('');
  email:Control = new Control('', this.services.emailValidator);
  item:Object;
  hide:boolean = false;
  message:string = '';
  pickPhone:string = '';
  field:string;
  picked:Array<any>;

  constructor(public backand:Backand, public services:Services, public params:NavParams) {
    this.params = params;
    this.itemDetail();
    this.text['_value'] = 'Something Cool';
    this.smsForm = new ControlGroup({
      phone: this.phone,
      text: this.text
    });
    this.emailForm = new ControlGroup({
      email: this.email,
      text: this.text
    })
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
    Contacts.pickContact().then((contact) => {
      this.picked = contact;
      this.hide = true;
      console.log(this.picked, this.picked['name'], this.picked['phoneNumbers'], this.picked['emails']);
    })
  }
}
