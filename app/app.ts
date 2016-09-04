import { Component, OnInit, Type, ViewChild } from "@angular/core";
import { Platform, ionicBootstrap, LocalStorage, Nav, Events, Storage } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { BackandService, UserService, FormHandler } from './services';
import { LoginPage, SideMenu } from './pages';

@Component({
  template: '<ion-nav id="nav" [root]="rootPage"></ion-nav>'
})

export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  local: LocalStorage = new Storage(LocalStorage);
  rootPage: Type = LoginPage;

  constructor(public platform: Platform, public back: BackandService, public events: Events, public user: UserService) {
    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
      StatusBar.overlaysWebView(false);
      StatusBar.backgroundColorByHexString('#0d95bb');
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
  }
}

ionicBootstrap(MyApp, [BackandService, UserService, FormHandler], {
  mode: 'md',
  scrollAssist: false,
  tabsHighlight: true,
  tabsHideOnSubPages: true
});