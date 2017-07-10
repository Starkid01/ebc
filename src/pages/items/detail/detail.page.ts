import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Contacts, Contact } from '@ionic-native/contacts';

import { BackandItem } from '../../../providers/backand';
import { ShareInput } from '../../../providers/myservices';

@IonicPage({
  name: 'detail',
  segment: 'item/:id',
  defaultHistory: ['my-cards']
})
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.page.html'
})

export class DetailPage implements OnInit {
  ebcUrl: string = 'http://ebc.beezleeart.com/card/';
  emailShare: ShareInput;
  hide: boolean = false;
  item: BackandItem;
  smsShare: ShareInput;
  type: string;

  constructor(public params: NavParams, private contacts: Contacts, private toast: ToastController) { }

  ngOnInit() {
    this.itemDetail();
    this.setEmail();
    this.setMessage();
  }

  getContact() {
    this.contacts.pickContact().then((contact) => {
      this.setEmail(contact);
      this.setMessage(contact);
      this.hide = true;
    });
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
  }

  sentMsg(type: string) {
    let isSent = this.toast.create({
      message: `Your ${type} as been Sent`,
      duration: 5000
    });

    isSent.present();
  }

  setEmail(contact?: Contact) {
    this.emailShare = {
      ebcUrl: `${this.ebcUrl}${this.item['id']}`,
      hide: false,
      messText: this.setText(),
      disabled: this.item.disable
    }
    if (contact) {
      this.emailShare.contacts = contact.emails;
      this.emailShare.hide = true;
      this.emailShare.name = contact.name;
    }
  }

  setMessage(contact?: Contact) {
    this.smsShare = {
      ebcUrl: `${this.ebcUrl}${this.item['id']}`,
      hide: false,
      messText: this.setText(),
      disabled: this.item.disable
    }
    if (contact) {
      this.smsShare.contacts = contact.phoneNumbers;
      this.smsShare.hide = true;
      this.smsShare.name = contact.name;
    }
  }

  setText(): string {
    let startText: string = `Check out my interactive EBC ${this.type}, just touch to connect.`;
    return startText;
  }
}
