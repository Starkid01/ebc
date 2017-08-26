import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandItemService } from '../../../providers';

@IonicPage({
	name: 'sample-cards',
	segment: 'sc'
})
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

	constructor(public alert: AlertController, public backand: BackandItemService,
		public modal: ModalController, public nav: NavController, public toast: ToastController) {
		super(alert, backand, modal, nav, toast);
	}

	ngOnInit() {
		super.ngOnInit();
	}

	ngDoCheck() {
		super.ngDoCheck();
	}
}