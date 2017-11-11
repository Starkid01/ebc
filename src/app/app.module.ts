import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BackandService } from '@backand/angular2-sdk';
import { AppRate } from '@ionic-native/app-rate';
import { AppVersion } from '@ionic-native/app-version';
import { Camera } from '@ionic-native/camera';
import { Deeplinks } from '@ionic-native/deeplinks';
import { File } from '@ionic-native/file';
import { Firebase } from '@ionic-native/firebase';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { InlineSVGModule } from 'ng-inline-svg';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import io from 'socket.io-client';
window["io"] = io;

import { MyApp } from './app.component';
import { NavModule } from '../pages/shared/nav';
import { BackandAuthService, BackandItemService } from '../providers/backand';
import { FormHandler, PictureService, UserService } from '../providers/myservices';
import { EbcSvgComponentModule } from '../components/ebc-svg/ebc-svg.module';
import { EbcEmailComponentModule } from '../components/ebc-email/ebc-email.module';
import { EbcSmsComponentModule } from '../components/ebc-sms/ebc-sms.module';

const config = {
  mode: 'md',
  scrollAssist: false,
  tabsHighlight: true,
  tabsHideOnSubPages: true
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    EbcEmailComponentModule,
    EbcSmsComponentModule,
    EbcSvgComponentModule,
    HttpClientModule,
    HttpModule,
    InlineSVGModule.forRoot({ baseUrl: 'https://cors-anywhere.herokuapp.com/' }),
    IonicModule.forRoot(MyApp, config),
    IonicStorageModule.forRoot(),
    NavModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppRate,
    AppVersion,
    Camera,
    Deeplinks,
    File,
    Firebase,
    BackandAuthService,
    BackandItemService,
    BackandService,
    FormHandler,
    PictureService,
    StatusBar,
    SplashScreen,
    SocialSharing,
    UserService
  ]
})
export class AppModule { }
