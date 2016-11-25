import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandItemService, BackandConfigService } from '../../../providers';

@Component({
	selector: 'page-items',
  templateUrl: 'base.component.html'
})

export class SCardsPage extends ItemBase {
	dbTable = 'samples';
	delete = false;
	itemType = 'SampleCard';
	title: string = 'Sample Cards';
	type = 'Card';

		constructor(public config: BackandConfigService, public backand: BackandItemService, public nav: NavController, public toast: ToastController) {
		super(config, backand, nav, toast);
	}


	ngOnInit() {
		super.ngOnInit();
	}

	ngDoCheck() {
		super.ngDoCheck();
	}
}