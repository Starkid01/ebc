import { NgModule } from '@angular/core';
import { AppAvailability } from '@ionic-native/app-availability';
import { Contacts } from '@ionic-native/contacts';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { IonicModule } from 'ionic-angular';
import { InlineSVGModule } from 'ng-inline-svg';

import { DetailPage } from './detail';
import { MyStuff } from './mystuff.tabs';
import { NavModule } from '../shared/nav';
import { Samples } from './samples.tabs';
import { Templates } from './templates.tabs';
import { ShareModalComponent } from './share-modal';
import {
	MyCardsPage,
	MyFlysPage,
	SCardsPage,
	SFlysPage,
	TCardsPage,
	TFlysPage
} from './list';

@NgModule({
	declarations: [
		DetailPage,
		MyStuff,
		Samples,
		Templates,
		MyCardsPage,
		MyFlysPage,
		SCardsPage,
		SFlysPage,
		ShareModalComponent,
		TCardsPage,
		TFlysPage
	],
	imports: [
    InlineSVGModule,
		IonicModule,
		NavModule
	 ],
	entryComponents: [
		DetailPage,
		MyStuff,
		Samples,
		Templates,
		MyCardsPage,
		MyFlysPage,
		SCardsPage,
		SFlysPage,
		ShareModalComponent,
		TCardsPage,
		TFlysPage
	],
	providers: [
		AppAvailability,
		Contacts,
		InAppBrowser,
		LaunchNavigator
	]
})
export class ItemModule { }