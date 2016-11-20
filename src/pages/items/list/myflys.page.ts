import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandService } from '../../../providers';

@Component({
	selector: 'page-items',
	templateUrl: 'base.component.html'
})

export class MyFlysPage extends ItemBase {
		title: string = 'My Flyers';

	constructor(public backand: BackandService, public nav: NavController) {
		super(backand, nav);
		this.dbTable = 'items';
		this.itemType = 'MyFlyer';
	}
}