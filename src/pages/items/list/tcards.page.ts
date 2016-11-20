import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandService } from '../../../providers';

@Component({
	selector: 'page-items',
  templateUrl: 'base.component.html'
})

export class TCardsPage extends ItemBase {
	title: string = 'Template Cards';

	constructor(public backand: BackandService, public nav: NavController) {
		super(backand, nav);
		this.dbTable = 'templates';
		this.itemType = 'TempCard';
	}
}