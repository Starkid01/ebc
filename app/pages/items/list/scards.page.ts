import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemBase } from './';
import { NavComponent } from '../../shared/nav';
import { BackandService } from '../../../services';

@Component({
  templateUrl: 'build/pages/items/list/base.component.html',
	directives: [NavComponent]
})

export class SCardsPage extends ItemBase {
	title: string = 'Sample Cards';

	constructor(public backand: BackandService, public nav: NavController) {
		super(backand, nav);
		this.dbTable = 'samples';
		this.itemType = 'SampleCard';
	}
}