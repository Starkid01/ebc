import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';


import { EbcSvgComponent } from './ebc-svg';

@NgModule({
  declarations: [
    EbcSvgComponent
  ],
  imports: [
    InlineSVGModule,
    IonicModule
  ],
  exports: [
    EbcSvgComponent
  ],
	providers: [
		AppAvailability,
		InAppBrowser,
		LaunchNavigator
	]
})
export class EbcSvgComponentModule {}
