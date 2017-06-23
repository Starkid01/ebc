import { NgModule } from '@angular/core';
import { AppAvailability } from '@ionic-native/app-availability';
import { Contacts } from '@ionic-native/contacts';
import { IonicPageModule } from 'ionic-angular';
import { InlineSVGModule } from 'ng-inline-svg';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';

import { DetailPage } from './detail.page';
import { NavModule } from '../../shared/nav';

@NgModule({
  declarations: [
    DetailPage
  ],
  imports: [
    IonicPageModule.forChild(DetailPage),
		InlineSVGModule,
		NavModule
  ],
  entryComponents: [
    DetailPage
  ],
	providers: [
		AppAvailability,
		Contacts,
		InAppBrowser,
		LaunchNavigator
	]
})
export class DetailPageModule {}