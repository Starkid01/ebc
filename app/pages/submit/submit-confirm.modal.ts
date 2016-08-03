import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { BackandService } from '../../services';

@Component({
	templateUrl: 'build/pages/submit/submit-confirm.modal.html'

})

export class SubmitConfirm implements OnInit {
	contactData: Object = {};
	extra: Object[];
	formData: Object = {};
	selectData: Object = {};
	socialData: Object = {};
	
	constructor(private back: BackandService, private params: NavParams, private view: ViewController) {

	}

	ngOnInit() {
		this.dataParse();
	}

	close() {
		this.view.dismiss();
	}

	dataParse() {
		this.extra = this.params.data.data;
		this.formData = this.params.data;
		this.contactData = this.extra.find(i => i.hasOwnProperty('bodyName'));
		this.socialData =  this.extra.find(i => i.hasOwnProperty('fb'));
		this.selectData =  this.extra.find(i => i.hasOwnProperty('selName'));
		console.log(this.formData, this.contactData, this.socialData, this.selectData);
	}
}