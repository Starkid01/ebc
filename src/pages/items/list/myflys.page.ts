import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandItemService } from '../../../providers';

@Component({
	selector: 'page-items',
	templateUrl: 'base.component.html'
})

export class MyFlysPage extends ItemBase {
		dbTable = 'items';
		delete = true;
		itemType = 'MyFlyer';
		title: string = 'My Flyers';
		type = 'Flyer';

	constructor(public backand: BackandItemService, public nav: NavController, public toast: ToastController) {
		super(backand, nav, toast);
	}

	ngOnInit() {
		super.ngOnInit();
	}

	ngDoCheck() {
		super.ngDoCheck();
	}
}