import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandItemService } from '../../../providers';

@IonicPage({
	name: 'template-flyers',
	segment: 'tf'
})
@Component({
	selector: 'page-items',
	templateUrl: 'base.component.html'
})

export class TFlysPage extends ItemBase {
	dbTable = 'templates';
	delete = false;
	itemType = 'TempFlyer';
	title: string = 'Template Flyers';
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