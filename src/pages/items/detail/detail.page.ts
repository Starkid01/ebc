import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { NavParams, Platform, ToastController } from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';
import { Contacts, Contact } from '@ionic-native/contacts';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';

import { BackandItem } from '../../../providers/backand';
import { FormHandler } from '../../../providers/myservices';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.page.html'
})

export class DetailPage implements OnInit {
  @ViewChild('myItem') myItem: ElementRef;

  body: FormControl = new FormControl('');
  ebcUrl: string = 'http://ebc.beezleeart.com/card/';
  email: FormControl = new FormControl('', [this.form.emailValidator, Validators.required]);
  emailForm: FormGroup;
  emailText: FormControl = new FormControl('');
  field: string;
  hide: boolean = false;
  item: BackandItem;
  itemName: string;
  message: string = '';
  opened: boolean;
  phone: FormControl = new FormControl('', [this.form.phoneValidator, Validators.required]);
  picked: Contact;
  pickPhone: string = '';
  sample: boolean;
  smsForm: FormGroup;
  smsText: FormControl = new FormControl('');
  type: string;

  constructor(public params: NavParams, public form: FormHandler,
    private appAvail: AppAvailability, private contacts: Contacts, private appBrowser:InAppBrowser, private launch: LaunchNavigator,
    private platform: Platform, private render: Renderer, private social: SocialSharing, private toast: ToastController) {
    this.params = params;
    this.platform = platform;
    this.smsForm = new FormGroup({
      phone: this.phone,
      smsText: this.smsText
    });
    this.emailForm = new FormGroup({
      email: this.email,
      emailText: this.emailText,
      body: this.body
    });
  }

  ngAfterViewInit() {
    this.clickCheck();
  }

  ngOnInit() {
    this.itemDetail();
  }

  ngDoCheck() {
    this.setText();
  }

  clickCheck() {
    let app = {};
    if (this.item.ready) {
      let my = this.myItem.nativeElement;

      this.render.listen(my, 'click', (e) => {
        let clicked = e.target['parentNode'];
        if (clicked['href']) {
          let link = clicked['href']['baseVal'];
          let attr = Array.from(clicked['attributes']);
          let data = attr[2]['value'];
          let insta = new RegExp('\w$');
          if (e.target['id'] === 'address') {
            e.preventDefault();
            this.launch.navigate(data)
              .then(
              success => console.log('Launched navigator'),
              error => console.log('Error launching navigator', error)
              );
          }
          if (link.includes('facebook')) {
            e.preventDefault();
            app = {
              appName: 'fb',
              url: link,
              appLink: `fb://${data}`
            };
            this.isAvail(app);
          };
          if (e.target['id'] === 'instagram' || e.target['id'] === 'ebc' || e.target['id'] === `insta${insta}`) {
            e.preventDefault();
            app = {
              appName: 'dm',
              url: link,
              appLink: `instagram://${data}`
            };
            this.isAvail(app);
          };
        };
      });
    }
  }

  customField() {
    if (this.message === 'text') {
      this.phone.setValue(this.field);
    }
    if (this.message === 'mail') {
      this.email.setValue(this.field);
    }
  }

  getContact() {
    this.contacts.pickContact().then((contact) => {
      this.picked = contact;
      this.hide = true;
    });
  }

  isAvail(app: Object) {
    let myApp = app;
    let fb;
    let dm;
    let dom;

    if (this.platform.is('ios')) {
      fb = 'fb://';
      dm = 'instagram://';
    } else if (this.platform.is('android')) {
      fb = 'com.facebook.katana';
      dm = 'com.instagram.android';
    }
    if (myApp['appName'] === 'fb') {
      Object.defineProperty(myApp, 'check', {
        value: fb
      });
    }
    if (myApp['appName'] === 'dm') {
      Object.defineProperty(myApp, 'check', {
        value: dm
      });
    }

    this.appAvail.check(myApp['check'])
      .then(
      yes => {
        dom = this.appBrowser.create(myApp['appLink'], '_system');
      },
      no => {
        dom = this.appBrowser.create(myApp['url'], '_system');
      });
  }

  isDisable() {
    let obj = this.params.get('table');
    this.sample = this.item.disable;
    this.itemName = obj;
  }

  isType() {
    if (this.item['flyer']) {
      this.type = 'Flyer';
    } else {
      this.type = 'Card';
    }
    this.setText();
  }

  itemDetail() {
    this.item = this.params.data;
    this.isType();
    this.isDisable();
    this.opened = true;
  }

  sendEmail(form) {
    let myInput = form.value;
    let link: string = `${this.ebcUrl}${this.item['id']}`;
    let myEmail = `<p>${myInput['body']}</p> <p>${link}</p>`;

    this.social.shareViaEmail(myEmail, myInput['emailText'], myInput['email']).then(
      data => this.sentMsg('Email'),
      err => console.log(err, 'Fail'));
  }

  sentMsg(type: string) {
    let isSent = this.toast.create({
      message: `Your ${type} as been Sent`,
      duration: 5000
    });

    isSent.present();
  }

  sendSms(form) {
    let mySms = form.value;
    let link: string = `${this.ebcUrl}${this.item['id']}`;
    let body = `${mySms['smsText']} ${link}`;

    this.social.shareViaSMS(body, mySms.phone).then(
      data => this.sentMsg('SMS Text'),
      err => console.log(err, 'Fail'));
  }

  setText() {
    if (this.opened) {
      let startText: string = `Check out my interactive EBC ${this.type}, just touch to connect.`;
      this.smsText.setValue(startText);
      this.emailText.setValue(startText);
      this.opened = false;
    }
  }
}
