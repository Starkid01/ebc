import { Component, DoCheck, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandService } from '../../../providers';

@Component({
	selector: 'page-items',
	templateUrl: 'base.component.html'
})
export class MyCardsPage extends ItemBase implements DoCheck, OnInit {
	title: string = 'My Cards';

	constructor(public backand: BackandService, public nav: NavController) {
		super(backand, nav);
		this.dbTable = 'items';
		this.itemType = 'MyCard';
	}

	ngOnInit() {
		super.ngOnInit();
	}

	ngDoCheck() {
		super.ngDoCheck();
	}
}