import { Component, DoCheck, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandItemService } from '../../../providers';

@Component({
	selector: 'page-items',
	templateUrl: 'base.component.html'
})
export class MyCardsPage extends ItemBase implements DoCheck, OnInit {
	dbTable = 'items';
	delete = true;
	itemType = 'MyCard';
	title: string = 'My Cards';
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