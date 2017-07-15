import { Component, OnInit, ViewChild } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import { Deeplinks } from '@ionic-native/deeplinks';
import { FCM } from '@ionic-native/fcm';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { App, Events, Nav, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { BackandItemService } from '../providers/backand';
import { UserService } from '../providers/myservices';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'login';

  constructor(public app: App, public platform: Platform, public backand: BackandService, public deeplinks: Deeplinks,
    public events: Events, public fcm: FCM, public items: BackandItemService, public splashScreen: SplashScreen,
    public statusBar: StatusBar, public storage: Storage, public user: UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#0d95bb');
      this.splashScreen.hide();

      this.deeplinks.routeWithNavController(this.nav, {
        '/card/:id': 'deep'
      }).subscribe(
        (match) => console.log('Successfully matched route', match),
        (nomatch) => console.log('Successfully matched route', nomatch));
    });
  }

  ngOnInit() {
    this.backand.init({
      appName: 'ebc2',
      anonymousToken: '6755ec7e-3a7e-4dc7-a414-fd1acf8a51a1',
      isMobile: true,
      manageRefreshToken: true,
      mobilePlatform: 'ionic',
      runSocket: true,
      signUpToken: 'dbaea0da-730d-4039-8f8a-77a507a3e908',
      storagePrefix: 'ebc-',
      useAnonymousTokenByDefault: false
    });
    this.authCheck();
    this.myEvents();
    this.nav.id = 'ebc';
  }

  authCheck() {
    this.updateList();
    this.storage.get('auth').then(
      bool => {
        if (bool) {
          this.user.getUser();
          this.items.buildList();
          this.nav.setRoot('menu');
        } else {
          this.nav.setRoot('login');
        }
      }
    )
  }

  rebuildList(listArr: Array<any>) {
    let items: Array<any> = [];

    listArr.forEach(res => {
      let obj = {};

      res.forEach(i => {
        obj[i.Key] = i.Value;
      })
      items.push(obj);
    });
    return items;
  }

  myEvents() {
    this.user.userData();
    this.events.subscribe('login', () => {
      this.items.buildList();
    });
    this.events.subscribe('notify', (get) => {
      this.registerDevice();
      this.noitified(get);
    });
  }

  noitified(on) {
    let push: Subscription;
    let subbed: boolean = false;

    if (on) {
      push = this.fcm.onNotification()
        .subscribe(data => {
          subbed = true;
          if (data.wasTapped) {
            console.log('Received in background');
          } else {
            console.log('Received in foreground');
          };
        })
    } else {
      console.log('Notification Off');
      if (subbed) {
        push.unsubscribe();
        subbed = false;
      }
    }
  }

  registerDevice() {
    this.fcm.getToken()
      .then(device => {
        this.user.notifyEnroll(device);
      })
      .catch(err => console.log(err));

    let refresh = this.fcm.onTokenRefresh().subscribe(
      token => console.log(token),
      err => console.log(err))
  }

  updateList() {
    this.backand.on('items_updated', (data) => {
      let card = this.rebuildList(data[0]);
      let flyer = this.rebuildList(data[1]);

      this.storage.set('MyCard', card)
        .then(() => {
          this.events.publish('set-items', 'MyCard');
        });
      this.storage.set('MyFlyer', flyer)
        .then(() => {
          this.events.publish('set-items', 'MyFlyer');
        });
    });
  }
}

