import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { IonicPage, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Contacts, Contact } from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';

import { BackandItem } from '../../../providers';
import { ShareInput } from '../../../providers/myservices';

@IonicPage({
  name: 'share'
})
@Component({
  selector: 'share-modal',
  templateUrl: 'share-modal.html'
})
export class ShareModalComponent implements OnInit {
  ebcUrl: string = 'http://ebc.beezleeart.com/card/';
  emailShare: ShareInput;
  hide: boolean = false;
  item: BackandItem;
  smsShare: ShareInput;
  type: string;

  constructor(private contacts: Contacts, private params: NavParams, private toast: ToastController, private view: ViewController) { }

  ngOnInit() {
    this.getItem();
    this.setEmail();
    this.setMessage();
  }

  close() {
    this.view.dismiss();
  }

  getContact() {
    this.contacts.pickContact().then((contact) => {
      this.setEmail(contact);
      this.setMessage(contact);
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
