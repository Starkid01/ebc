import { Component, OnInit, ViewChild } from '@angular/core';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
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

  constructor(public app: App, public fireAuth: AngularFireAuth, public platform: Platform, public deeplinks: Deeplinks,
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
    this.authCheck();
    this.myEvents();
    this.nav.id = 'ebc';
  }

  authCheck() {
    this.fireAuth.idToken.subscribe(
      token => {
        let user = this.fireAuth.auth.currentUser;
        if (token) {
          let authUser = {
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          };
          this.setAuthState(true, token, authUser)
        } else {
          this.setAuthState(false)
        }
      });

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
    this.events.subscribe('login', () => {
      //this.items.buildList();
    });
    this.events.subscribe('alerts', fire => {
      if (fire) {
        this.registerDevice();
      }
      this.noitified(fire);
    });
  }

  noitified(on) {
    let push: Subscription = this.pushStream();
    let refresh = this.refreshStream();
    if (!on) {
      console.log('Notification Off');
      push.unsubscribe();
      refresh.unsubscribe();
      this.removeDevice();
    }
    this.firebase.hasPermission()
      .then(enabled => console.log(enabled))
      .catch(err => console.log(err));
  }

  registerDevice() {
    this.storage.get('device')
      .then(id => {
        if (!id) {
          this.registerPermissions();
        }
      })
      .catch(err => console.log(err));
  }

  removeDevice() {
    this.storage.get('device')
      .then(id => this.user.notifyRemove(id))
      .catch(err => console.log(err));
    this.firebase.unregister();
  }

  updateList() {

  }

  private pushStream() {
    return this.firebase.onNotificationOpen()
      .subscribe(data => {
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        };
      });
  }

  private refreshStream() {
    return this.firebase.onTokenRefresh().subscribe(
      token => this.user.notifyUpdate(token),
      err => console.log(err));
  }

  private registerPermissions() {
    this.firebase.grantPermission()
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.firebase.getToken()
      .then(token => this.user.notifyEnroll(token))
      .catch(err => console.log(err));
  }

  private setAuthState(status: boolean, authToken?, user?) {
    if (status) {
      this.nav.setRoot('menu');
      this.storage.set('token', authToken);
      this.storage.set('ebcUser', JSON.stringify(user));
    } else {
      this.nav.setRoot('login');
      this.storage.remove('token')
      this.storage.remove('ebcUser')
    }
  }
}