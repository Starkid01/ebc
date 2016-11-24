import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login';
import { CreatePage } from '../pages/create';
import { EditPage, PersonPage } from '../pages/profile';
import { NavModule, SideMenu } from '../pages/shared';
import { ItemModule } from '../pages/items';
import { SubmitModule } from '../pages/submit';
import {
  BackandAuthService,
  BackandConfigService,
  BackandItemService,
  FormHandler,
  PictureService,
  UserService
} from '../providers';

const config = {
  mode: 'md',
  scrollAssist: false,
  tabsHighlight: true,
  tabsHideOnSubPages: true
}

@NgModule({
  declarations: [
    MyApp,
    CreatePage,
    EditPage,
    LoginPage,
    PersonPage,
    SideMenu
  ],
  imports: [
    ItemModule,
    IonicModule.forRoot(MyApp, config),
    NavModule,
    SubmitModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreatePage,
    EditPage,
    LoginPage,
    PersonPage,
    SideMenu
  ],
  providers: [
    BackandAuthService,
    BackandConfigService,
    BackandItemService,
    FormHandler,
    PictureService,
    UserService,
    Storage
  ]
})
export class AppModule { }
