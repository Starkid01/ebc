import { Component } from '@angular/core';
import { AlertController, ModalController, IonicPage, NavController, ToastController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandItemService } from '../../../providers';

@IonicPage({
	name: 'my-flyers',
	segment: 'my-flyers'
})
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