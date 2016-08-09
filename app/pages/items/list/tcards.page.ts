import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemBase } from './';
import { NavComponent } from '../../shared/nav';
import { BackandService } from '../../../services';

@Component({
  templateUrl: 'build/pages/items/list/base.component.html',
	directives: [NavComponent]
})

export class TCardsPage extends ItemBase {
	title: string = 'Template Cards';

	constructor(public backand: BackandService, public nav: NavController) {
		super(backand, nav);
		this.dbTable = 'templates';
		this.itemType = 'TempCard';
	}
}