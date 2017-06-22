import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login.page';
import { NavModule } from '../shared';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
		NavModule
  ],
  entryComponents: [
    LoginPage
  ]
})
export class LoginPageModule {}