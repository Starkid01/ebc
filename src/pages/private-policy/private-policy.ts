import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IonicPage, ViewController } from 'ionic-angular';

import { info } from './policy';

@IonicPage({
  name: 'private-policy'
})
@Component({
  selector: 'page-private-policy',
  templateUrl: 'private-policy.html'
})
export class PrivatePolicyPage implements OnInit {
  policy: SafeHtml;

  constructor(private stanitize: DomSanitizer, private view: ViewController) {}

  ngOnInit() {
    this.policy = this.stanitize.bypassSecurityTrustHtml(info);
  }

  closeModal() {
    this.view.dismiss();
  }
}
