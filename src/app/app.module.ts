import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
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

//import { AboutHelpPageModule } from '../pages/about-help';
import { MyApp } from './app.component';
//import { LoginPageModule } from '../pages/login';
//import { CreatePageModule } from '../pages/create';
//import { EditPageModule, PersonPageModule } from '../pages/profile';
import { NavModule } from '../pages/shared/nav';
//import { ItemModule } from '../pages/items';
//import { PrivatePolicyPageModule } from '../pages/private-policy';
//import { SubmitModule } from '../pages/submit';
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
    MyApp
  ],
  imports: [
    //AboutHelpPageModule,
    BrowserModule,
    //CreatePageModule,
    ///EditPageModule,
    //ItemModule,
    HttpModule,
    IonicModule.forRoot(MyApp, config),
    IonicStorageModule.forRoot(),
    NavModule
    //LoginPageModule,
    //PrivatePolicyPageModule,
    //PersonPageModule,
    //SideMenuModule,
    //SubmitModule
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
