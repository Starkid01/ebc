import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DetailPage } from './detail';
import { MyStuff } from './mystuff.tabs';
import { NavModule } from '../shared/nav';
import { Samples } from './samples.tabs';
import { Templates } from './templates.tabs';
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
		TCardsPage,
		TFlysPage
	],
	imports: [
		IonicModule.forRoot(MyStuff),
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
		TCardsPage,
		TFlysPage
	]
})
export class ItemModule { }