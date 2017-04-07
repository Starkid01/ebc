import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BackandService } from '@backand/angular2-sdk';
import { AppRate } from '@ionic-native/app-rate';
import { AppVersion } from '@ionic-native/app-version';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Transfer } from '@ionic-native/transfer';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import io from 'socket.io-client';
window["io"] = io;

import { AboutHelpPage } from '../pages/about-help';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login';
import { CreatePage } from '../pages/create';
import { EditPage, PersonPage } from '../pages/profile';
import { NavModule, SideMenu } from '../pages/shared';
import { ItemModule } from '../pages/items';
import { PrivatePolicyPage } from '../pages/private-policy';
import { SubmitModule } from '../pages/submit';
import { BackandAuthService, BackandItemService } from '../providers/backand';
import { FormHandler, PictureService, UserService } from '../providers/myservices';

const config = {
  mode: 'md',
  scrollAssist: false,
  tabsHighlight: true,
  tabsHideOnSubPages: true
}

@NgModule({
  declarations: [
    AboutHelpPage,
    MyApp,
    CreatePage,
    EditPage,
    LoginPage,
    PersonPage,
    PrivatePolicyPage,
    SideMenu
  ],
  imports: [
    BrowserModule,
    ItemModule,
    IonicModule.forRoot(MyApp, config),
    IonicStorageModule.forRoot(),
    NavModule,
    SubmitModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AboutHelpPage,
    MyApp,
    CreatePage,
    EditPage,
    LoginPage,
    PersonPage,
    PrivatePolicyPage,
    SideMenu
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppRate,
    AppVersion,
    Camera,
    File,
    BackandAuthService,
    BackandItemService,
    BackandService,
    FormHandler,
    PictureService,
    StatusBar,
    SplashScreen,
    SocialSharing,
    Transfer,
    UserService
  ]
})
export class AppModule { }
