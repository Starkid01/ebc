import {FORM_DIRECTIVES, Validators, ControlGroup, Control} from '@angular/common';
import {ViewChild, OnInit, Renderer, ElementRef} from '@angular/core';
import {Page, NavParams, Platform} from 'ionic-angular';
import {Contacts, SMS, EmailComposer, AppAvailability} from 'ionic-native';
import {MoreMenu} from '../moremenu/moremenu';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/detail/detail.html',
  directives: [MoreMenu, FORM_DIRECTIVES]
})

export class DetailPage implements OnInit {
  @ViewChild(MoreMenu) more:MoreMenu;
  emailForm:ControlGroup;
  smsForm:ControlGroup;
  phone:Control = new Control('');
  text:Control = new Control('');
  email:Control = new Control('', this.services.emailValidator);
  body:Control = new Control('');
  item:Object;
  hide:boolean = false;
  sample:boolean;
  message:string = '';
  pickPhone:string = '';
  field:string;
  picked:Array<any>;

  constructor(public backand:Backand, public services:Services, public params:NavParams, private platform:Platform) {
    this.params = params;
    this.platform = platform;
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
    });
    this.isSample();
  }

  ngOnInit() {
    this.isAvail();
  }

  isSample() {
    let obj = this.params.get('table');

    if(obj == 'samples'){
      this.sample = true;
    }
    else {
      this.sample = false;
    }
  }

  isAvail() {
    let os = this.platform;
    let t;
    let fb

    if(os.is('ios')) {
      t = 'twitter://';
      fb = 'fb://'
    } else if(os.is('android')) {
      t = 'com.twitter.android';
      fb ='com.facebook.katana';
    }

    AppAvailability.check(t)
      .then(
        yes => console.log(t + " is available"),
        no => console.log(t + " is NOT available")
      );
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
      body: '<p>' + myInput.body + '</p>' + this.item['media'],
      isHtml: true
    };

    EmailComposer.open(myEmail);
  }

  getContact() {
    Contacts.pickContact().then((contact) => {
      this.picked = contact;
      this.hide = true;
      console.log(this.picked, this.picked['name'], this.picked['phoneNumbers'], this.picked['emails']);
    })
  }
}
