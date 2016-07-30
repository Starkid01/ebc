import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { BackandService } from '../../services';

@Component({
	templateUrl: 'build/pages/submit/submit-confirm.modal.html'

})

export class SubmitConfirm {
	extra: Object[];

	constructor(private back: BackandService, private params: NavParams, private view: ViewController) {

	}

	ngOnInit() {
		let info = this.params.data.data.split('\n');
		this.extra = JSON.parse(`[${info}]`);
		console.log(this.params.data, this.extra, info.length);
	}

	close() {
		this.view.dismiss();
	}
}