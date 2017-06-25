import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsPage } from './settings';
import { NavModule } from '../shared/nav';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    NavModule
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule {}
