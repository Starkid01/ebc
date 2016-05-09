import {ViewChild} from 'angular2/core';
import {App, Platform, Nav, Events} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Backand} from './components/backand/backand';
import {Services} from './components/services/services';
import {LoginPage} from './pages/login/login';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';

@App({
  template: '<ion-nav id="nav" [root]="rootPage"></ion-nav>',
  providers: [Backand, Services],
  config: {
    mode: 'md',
    scrollAssist: false
  } // http://ionicframework.com/docs/v2/api/config/Config/
})

export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage:Type = LoginPage;

constructor(public platform:Platform, public events:Events ,public backand:Backand, public services:Services){
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
    });
    this.myEvents();
  }
  myEvents() {
    this.events.subscribe('myUser', (user) => {
      this.services.myUser = user[0];
    })
  }
}
