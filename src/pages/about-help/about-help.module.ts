import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppRate } from '@ionic-native/app-rate';
import { AppVersion } from '@ionic-native/app-version';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';


import { AboutHelpPage } from './about-help';

@NgModule({
  declarations: [
    AboutHelpPage
  ],
  imports: [
    IonicPageModule.forChild(AboutHelpPage)
  ],
  entryComponents: [
    AboutHelpPage
  ],
  providers: [
    AppRate,
    AppVersion,
    StatusBar,
    SocialSharing
  ]
})
export class AboutHelpPageModule {}