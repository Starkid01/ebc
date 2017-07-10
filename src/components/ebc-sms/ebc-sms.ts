import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Contacts, Contact } from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ShareInput, FormHandler } from '../../providers/myservices';

@Component({
  selector: 'ebc-sms',
  templateUrl: 'ebc-sms.html'
})
export class EbcSmsComponent implements DoCheck {
  @Input() set: ShareInput;
  @Output() method: EventEmitter<string> = new EventEmitter();

  phone: FormControl = new FormControl('', [this.form.phoneValidator, Validators.required]);
  smsField: string;
  smsForm: FormGroup;
  smsText: FormControl = new FormControl('');

  constructor(private form: FormHandler, private social: SocialSharing) {
    this.smsForm = new FormGroup({
      phone: this.phone,
      smsText: this.smsText
    });;
  }

  customPhone() {
    this.phone.setValue(this.smsField);
  }

  ngDoCheck() {
    if (this.set.messText !== undefined) {
      this.smsText.setValue(this.set.messText);
    }
  }

  sendSms(form) {
    let mySms = form.value;
    let link: string = this.set.ebcUrl;
    let body = `${mySms['smsText']} ${link}`;

    this.social.shareViaSMS(body, mySms.phone).then(
      data => this.method.emit('SMS Text'),
      err => console.log(err, 'Fail'));
  }
}
