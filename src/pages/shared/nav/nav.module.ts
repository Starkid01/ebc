import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { NavComponent } from './nav.component';
import { PopoverMenu } from './popover.menu';

@NgModule({
	declarations: [
		NavComponent,
		PopoverMenu
	],
	exports: [
		NavComponent
	],
	imports: [
		CommonModule,
		IonicModule.forRoot(NavComponent)
	],
	entryComponents: [
		PopoverMenu
	]
})

export class NavModule { };
