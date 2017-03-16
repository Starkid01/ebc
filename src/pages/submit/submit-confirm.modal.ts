import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, ViewController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

interface Build {
	create?: string;
}

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

interface PreMade {
	selID?: string;
	selName?: string;
	selImg?: string;
}

interface Social {
	social?: Array<string>;
}

@Component({
	selector: 'modal-confirm',
	templateUrl: 'submit-confirm.modal.html'
})

export class SubmitConfirm implements OnInit {
	contactData: Contact = {};
	createData: Build = {};
	extra: Object[];
	formData: Form = {};
	selectData: Object = {};
	socialData: Social = {};
	tempData: PreMade = {};
	template: boolean = false;


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
		this.contactData = this.extra.find(obj => obj.hasOwnProperty('bodyName'));
		this.socialData = this.extra.find(obj => obj.hasOwnProperty('social'));
		this.selectData = this.extra.find(obj => obj.hasOwnProperty('selName'));
		this.createData = this.extra.find(obj => obj.hasOwnProperty('create'));
		this.tempData = this.extra.find(obj => obj.hasOwnProperty('selID'));
		if (this.tempData !== undefined) {
			this.template = true;
			let logo = {
				logo: this.formData.pic
			};
			this.extra.push(logo);
		}
	}

	finalSubmit() {
		let itemData = this.formData;
		if (this.tempData !== undefined) {
			this.formData.pic = this.tempData.selImg;
		}
		itemData['data'] = JSON.stringify(this.extra);

		this.backand.object.create('items', itemData)
		  .then(res => {
				this.completeSubmit();
			})
			.catch(err => {
				console.log(err);
			});
	}
}