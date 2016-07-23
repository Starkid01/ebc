import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemBase } from './';
import { NavComponent } from '../../nav';
import { BackandService } from '../../../../services';

@Component({
  templateUrl: 'build/pages/shared/items/list/base.component.html',
	directives: [NavComponent]
})
export class MyCardsPage extends ItemBase {
	title: string = 'My Cards';

	constructor(public backand: BackandService, public nav: NavController) {
		super(backand, nav);
		this.dbTable = 'items';
		this.itemType = 'MyCard'
	}
}