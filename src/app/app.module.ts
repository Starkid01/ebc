import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
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
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule }from 'angularfire2/auth'; 
import io from 'socket.io-client';
window["io"] = io;

import { MyApp } from './app.component';
import { NavModule } from '../pages/shared/nav';
import { BackandAuthService, BackandItemService } from '../providers/backand';
import { FormHandler, PictureService, UserService } from '../providers/myservices';
import { EbcSvgComponentModule } from '../components/ebc-svg/ebc-svg.module';
import { EbcEmailComponentModule } from '../components/ebc-email/ebc-email.module';
import { EbcSmsComponentModule } from '../components/ebc-sms/ebc-sms.module';
import { creds } from './ebc-client';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';

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
    AngularFireModule.initializeApp(creds),
    AngularFireAuthModule,
    BrowserModule,
    EbcEmailComponentModule,
    EbcSmsComponentModule,
    EbcSvgComponentModule,
    HttpClientModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider,  multi: true },
    AppRate,
    AppVersion,
    Camera,
    Deeplinks,
    File,
    Firebase,
    BackandAuthService,
    BackandItemService,
    FormHandler,
    PictureService,
    StatusBar,
    SplashScreen,
    SocialSharing,
    UserService,
    AuthInterceptorProvider
  ]
})
export class AppModule { }
