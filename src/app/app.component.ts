import { Component, OnInit, ViewChild } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Firebase } from '@ionic-native/firebase';
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
    public events: Events, public firebase: Firebase, public items: BackandItemService, public splashScreen: SplashScreen,
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
    this.storage.get('auth')
      .then(bool => {
        if (bool) {
          this.user.getUser();
          this.items.buildList();
          this.nav.setRoot('menu');
        } else {
          this.nav.setRoot('login');
        }
      }).catch(err => console.log(err));
    this.storage.get('notify')
      .then(res => this.noitified(res))
      .catch(err => console.log(err));
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
    this.events.subscribe('alerts', fire => {
      if (fire) {
        this.registerDevice();
      }
      this.noitified(fire);
    });
  }

  noitified(on) {
    let push: Subscription = this.firebase.onNotificationOpen()
      .subscribe(data => {
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        };
        console.log('Hello World');
      });

    let refresh = this.firebase.onTokenRefresh().subscribe(
      token => this.user.notifyUpdate(token),
      err => console.log(err));

    if (!on) {
      console.log('Notification Off');
      push.unsubscribe();
      refresh.unsubscribe();
      this.removeDevice();
    }
  }

  registerDevice() {
    this.storage.get('device')
      .then(id => {
        if (!id) {
          this.firebase.getToken()
            .then(device => this.user.notifyEnroll(device))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  removeDevice() {
    this.storage.get('device')
      .then(id => this.user.notifyRemove(id))
      .catch(err => console.log(err));
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

