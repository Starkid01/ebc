import {FORM_DIRECTIVES, Validators, ControlGroup, Control} from '@angular/common';
import {ViewChild} from '@angular/core';
import {Page, NavParams} from 'ionic-angular';
import {Contacts, SMS, EmailComposer} from 'ionic-native';
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
  body:Control = new Control('');
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
      text: this.text,
      body: this.body
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

    SMS.send(mySms.phone, mySms.text + ' ' + this.item['media']);
  }

  sendEmail(form) {
    let myInput = form.value;
    let myEmail = {
      to: myInput.email,
      subject: myInput.text,
      body: myInput.body,
      isHtml: true
    };

  EmailComposer.open(myEmail).then(() => {
      console.log(myEmail);
    });
  }

  getContact() {
    Contacts.pickContact().then((contact) => {
      this.picked = contact;
      this.hide = true;
      console.log(this.picked, this.picked['name'], this.picked['phoneNumbers'], this.picked['emails']);
    })
  }
}
