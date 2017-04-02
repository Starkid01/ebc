import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { NavController } from 'ionic-angular';

import { PrivatePolicyPage } from '../private-policy';

@Component({
  selector: 'page-about-help',
  templateUrl: 'about-help.html'
})
export class AboutHelpPage implements OnInit {

  constructor(private appVersion: AppVersion, private nav: NavController) {}

  ngOnInit() {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutHelpPage');
  }

}
