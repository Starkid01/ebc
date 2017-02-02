import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { BackandConfigService } from '../providers/backand';
import { UserService } from '../providers/myservices';
import { LoginPage } from '../pages/login';
import { SideMenu } from '../pages/shared';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  rootPage: Type<LoginPage> = LoginPage;

  constructor(public platform: Platform, public config: BackandConfigService, public events: Events, public storage: Storage, public user: UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false);
      StatusBar.backgroundColorByHexString('#0d95bb');
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    this.config.authCheck();
    this.authCheck();
    this.myEvents();

    if (window.indexedDB) {
      console.log("I'm in WKWebView!");
    } else {
      console.log("I'm in UIWebView");
    }
  }

  authCheck() {
    this.storage.get('auth_token').then(
      jwt => {
        if (jwt) {
          this.user.getUser();
          this.nav.setRoot(SideMenu);
        } else {
          this.nav.setRoot(LoginPage);
        }
      }
    )
  }

  myEvents() {
    this.events.subscribe('myUser', (user) => {
      this.user.myUser = user;
    });
    this.events.subscribe('No Auth', () => {
      this.nav.setRoot(LoginPage);
    })
  }
}

