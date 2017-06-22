import { NgModule } from '@angular/core';

import { DetailPageModule } from './detail';
import { MyStuffModule } from './mystuff.tabs.module';
import { SamplesModule } from './samples.tabs.module';
import { TemplatesModule } from './templates.tabs.module';
import { MyCardsPageModule, MyFlysPageModule, SCardsPageModule,
	SFlysPageModule, TCardsPageModule, TFlysPageModule } from './list';

@NgModule({
	imports: [
		DetailPageModule,
		MyStuffModule,
		SamplesModule,
		TemplatesModule,
		MyCardsPageModule,
		MyFlysPageModule,
		SCardsPageModule,
		SFlysPageModule,
		TCardsPageModule,
		TFlysPageModule
	 ]
})
export class ItemModule { }