import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { IonicPage, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Contacts, Contact } from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';

import { BackandItem } from '../../../providers';
import { FormHandler } from '../../../providers/myservices';

@IonicPage({
  name: 'share'
})
@Component({
  selector: 'share-modal',
  templateUrl: 'share-modal.html'
})
export class ShareModalComponent implements OnInit {
  body: FormControl = new FormControl('');
  ebcUrl: string = 'http://ebc.beezleeart.com/card/';
  email: FormControl = new FormControl('', [this.form.emailValidator, Validators.required]);
  emailForm: FormGroup;
  emailText: FormControl = new FormControl('');
  field: string;
  hide: boolean = false;
  item: BackandItem;
  message: string = '';
  phone: FormControl = new FormControl('', [this.form.phoneValidator, Validators.required]);
  picked: Contact;
  pickPhone: string = '';
  smsForm: FormGroup;
  smsText: FormControl = new FormControl('');
  type: string;

  constructor(private contacts: Contacts, private form: FormHandler, private params: NavParams,
    private social: SocialSharing, private toast: ToastController, private view: ViewController) {
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

  ngOnInit() {
    this.getItem();
  }

  close() {
    this.view.dismiss();
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

  getItem() {
    this.item = this.params.data;

    if (this.item.flyer) {
      this.type = 'Flyer';
    } else {
      this.type = 'Card';
    }

    this.setText();
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
    let startText: string = `Check out my interactive EBC ${this.type}, just touch to connect.`;
    this.smsText.setValue(startText);
    this.emailText.setValue(startText);
  }
}