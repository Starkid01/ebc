import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, ViewController } from 'ionic-angular';

import { BackandItemService } from '../../providers';

interface Contact {
	bodyName?: string;
	phone?: string;
	email?: string;
}

interface Form {
	name?: string;
	desc?: string;
	flyer?: boolean;
	pic?: string;
}

interface Social {
	fb?: string;
	twitter?: string;
	instagram?: string;
	web?: string;
	spotify?: string;
	soundCloud?: string;
	linkedIn?: string;
}

@Component({
	selector: 'modal-confirm',
	templateUrl: 'submit-confirm.modal.html'
})

export class SubmitConfirm implements OnInit {
	contactData: Contact = {};
	extra: Object[];
	formData: Form = {};
	selectData: Object = {};
	socialData: Social = {};
	createData: Object = {};

	constructor(private backand: BackandItemService, private toast: ToastController, private params: NavParams, private view: ViewController) {

	}

	ngOnInit() {
		this.dataParse();
	}

	completeSubmit() {
		let completed = this.toast.create({
			message: 'Your Card/Flyer has been Submitted',
			duration: 5000,
		});

		completed.onDidDismiss(() => {
			this.close();
		});
		completed.present();
	}

	close() {
		this.view.dismiss();
	}

	dataParse() {
		this.extra = this.params.data.data;
		this.formData = this.params.data;
		this.contactData = this.extra.find(obj => obj.hasOwnProperty('bodyName'));
		this.socialData = this.extra.find(obj => obj.hasOwnProperty('fb'));
		this.selectData = this.extra.find(obj => obj.hasOwnProperty('selName'));
		this.createData = this.extra.find(obj => obj.hasOwnProperty('create'));
	}

	finalSubmit() {
		let itemData = this.formData;
		itemData['data'] = JSON.stringify(this.extra);

		this.backand.addItem('items', itemData).add(
			() => {
				this.completeSubmit()
			});
	}
}