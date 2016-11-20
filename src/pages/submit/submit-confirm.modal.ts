import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, ViewController } from 'ionic-angular';

import { BackandService } from '../../providers';

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

	constructor(private backand: BackandService, private toast: ToastController, private params: NavParams, private view: ViewController) {

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
      err => this.backand.errorHander(err),
      () => this.completeSubmit());
  }
}