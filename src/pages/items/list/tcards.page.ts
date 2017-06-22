import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandItemService } from '../../../providers';

@IonicPage({
	name: 'template-cards'
})
@Component({
	selector: 'page-items',
	templateUrl: 'base.component.html'
})

export class TCardsPage extends ItemBase {
	dbTable = 'templates';
	delete = false;
	itemType = 'TempCard';
	title: string = 'Template Cards';
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