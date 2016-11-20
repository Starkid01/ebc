import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { BackandService, UserService } from '../providers';
import { LoginPage } from '../pages/login';
import { SideMenu } from '../pages/shared';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  rootPage: Type<LoginPage> = LoginPage;

  constructor(public platform: Platform, public back: BackandService, public events: Events, public local: Storage, public user: UserService) {
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
    this.myEvents();
    this.authCheck();
  }

  authCheck() {
    this.local.get('jwt').then(
      jwt => {
        if (jwt) {
          this.back.isAuth(jwt);
          this.nav.setRoot(SideMenu);
        } else {
          this.nav.setRoot(LoginPage);
        }
      })
  }

  myEvents() {
    this.events.subscribe('myUser', (user) => {
      this.user.myUser = user[0];
    });
    this.events.subscribe('No Auth', () => {
      this.nav.setRoot(LoginPage);
    })
  }
}

