import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Toast, ViewController } from 'ionic-angular';

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

	constructor(private backand: BackandService, private nav: NavController, private params: NavParams, private view: ViewController) {

	}

	ngOnInit() {
		this.dataParse();
	}
	
	completeSubmit() {
		let completed = Toast.create({
			message: 'Your Card/Flyer has been Submitted',
			duration: 5000,
		});	

		completed.onDismiss(() => {
			this.close();
		})
		this.nav.present(completed);
	}

	close() {
		this.view.dismiss();
	}

	dataParse() {
		this.extra = this.params.data.data;
		this.formData = this.params.data;
		this.contactData = this.extra.find(i => i.hasOwnProperty('bodyName'));
		this.socialData = this.extra.find(i => i.hasOwnProperty('fb'));
		this.selectData = this.extra.find(i => i.hasOwnProperty('selName'));
		console.log(this.formData, this.contactData, this.socialData, this.selectData);
	}

	finalSubmit() {
		let itemData = this.formData;
		itemData['data'] = JSON.stringify(this.extra);

		this.backand.addItem(itemData).subscribe(
      data => console.log(data, itemData),
      err => console.log(this.backand.extractErrorMessage(err), itemData),
      () => this.completeSubmit())
	}
}