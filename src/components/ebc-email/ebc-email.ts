import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ShareInput, FormHandler } from '../../providers/myservices';

@Component({
  selector: 'ebc-email',
  templateUrl: 'ebc-email.html'
})
export class EbcEmailComponent implements DoCheck {
  @Input() set: ShareInput;
  @Output() method: EventEmitter<string> = new EventEmitter();

  body: FormControl = new FormControl('');
  email: FormControl = new FormControl('', [this.form.emailValidator, Validators.required]);
  emailField: string;
  emailForm: FormGroup;
  emailText: FormControl = new FormControl('');

  constructor(private form: FormHandler, private social: SocialSharing) {
    this.emailForm = new FormGroup({
      email: this.email,
      emailText: this.emailText,
      body: this.body
    });
  }

  ngDoCheck() {
    if (this.set.messText !== undefined) {
      this.emailText.setValue(this.set.messText);
    }
  }

  customEmail() {
    this.email.setValue(this.emailField);
  }

  sendEmail(form) {
    let myInput = form.value;
    let link: string = this.set.ebcUrl;
    let myEmail = `<p>${myInput['body']}</p> <p>${link}</p>`;

    this.social.shareViaEmail(myEmail, myInput['emailText'], myInput['email']).then(
      data => this.method.emit('Email'),
      err => console.log(err, 'Fail'));
  }
}
