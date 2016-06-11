import { Validators, ControlGroup, Control } from '@angular/common';
import { Component, Renderer } from '@angular/core';
import { NavParams, Platform } from 'ionic-angular';
import { Contacts, SMS, EmailComposer, AppAvailability, InAppBrowser, LaunchNavigator } from 'ionic-native';

import { Backand, Services } from '../../../services';
import { NavComponent } from '../nav';

@Component({
  templateUrl: 'build/pages/shared/detail/detail.page.html',
  directives: [NavComponent]
})

export class DetailPage {
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
  type:string;

  constructor(public backand:Backand, public services:Services, public params:NavParams, private platform:Platform, private render:Renderer) {
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

  isSample() {
    let obj = this.params.get('table');

    if(obj == 'samples'){
      this.sample = true;
    }
    else {
      this.sample = false;
    }
  }

  isType() {
    if(this.item['flyer']) {
      this.type = 'Flyer';
    }
    else {
      this.type = 'Card';
    }
  }

  clickCheck() {
    let app = {};
    if(this.platform.is('mobile')){
      let my = <SVGElement>document.getElementById('myItem')['contentDocument'];

      this.render.listen(my, 'click', (e) => {
        let clicked = e.target['parentNode'];
        if(clicked['href']) {
          let link = clicked['href']['baseVal'];
          if(e.target['id'] == 'address') {
            e.preventDefault();
            let data = clicked['attributes'][2]['value'];
            LaunchNavigator.navigate(data)
              .then(
                success => console.log('Launched navigator'),
                error => console.log('Error launching navigator', error)
              );
          }
          if(link.includes('facebook')) {
            e.preventDefault();
            app =
              {
                appName: 'fb',
                url: link,
                appLink: 'fb://facewebmodal/f?href=' + link
              };
            this.isAvail(app);
          };
          if(link.includes('instagram')) {
            e.preventDefault();
            app =
              {
                appName: 'dm',
                url: link,
                appLink: 'instagram://user?username=' + link.substr(link.search('com')+4)
              };
            this.isAvail(app);
          };
        };
      });
    }
  }

  isAvail(app:Object) {
    let myApp = app;
    let fb;
    let dm;

    if(this.platform.is('ios')) {
      fb = 'fb://';
      dm = 'instagram://';
    } else if(this.platform.is('android')) {
      fb ='com.facebook.katana';
      dm = 'com.instagram.android';
    }
    if(myApp['appName'] == 'fb') {
      Object.defineProperty(myApp, 'check',{
        value: fb
      })
    }
    if(myApp['appName'] == 'dm') {
      Object.defineProperty(myApp, 'check',{
        value: dm
      })
    }

    AppAvailability.check(myApp['check'])
      .then(
        yes => {
          console.log(myApp['check'] + " is available");
          InAppBrowser.open(myApp['appLink'], '_system');
        },
        no =>  {
          console.log(myApp['check'] + " is NOT available");
          InAppBrowser.open(myApp['url'], '_system');
        }
      );
  }

  itemDetail(){
    let obj = this.params.get('table');
    let id = this.params.get('index');

    this.backand.getItem(obj, id).subscribe(
      data => {
        this.item = data;
        this.isType();
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
