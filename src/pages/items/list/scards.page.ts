import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandService } from '../../../providers';

@Component({
	selector: 'page-items',
  templateUrl: 'base.component.html'
})

export class SCardsPage extends ItemBase {
	title: string = 'Sample Cards';

	constructor(public backand: BackandService, public nav: NavController) {
		super(backand, nav);
		this.dbTable = 'samples';
		this.itemType = 'SampleCard';
	}

	ngOnInit() {
		super.ngOnInit();
	}

	ngDoCheck() {
		super.ngDoCheck();
	}
}