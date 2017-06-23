import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { NavComponent } from './nav.component';
import { PopoverMenu } from './popover.menu';

@NgModule({
	declarations: [
		NavComponent,
		PopoverMenu
	],
	exports: [
		NavComponent,
		PopoverMenu
	],
	imports: [
		IonicModule
	],
	entryComponents: [
		PopoverMenu
	]
})

export class NavModule { };
