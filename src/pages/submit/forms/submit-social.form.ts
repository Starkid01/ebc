import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';

@Component({
	selector: 'ebc-social-form',
	templateUrl: 'submit-social.form.html'
})
export class SocialForm {
	selected: string = '';
	socialForm: FormGroup;
	socials: FormArray = new FormArray([
		new FormControl('')
	])

	constructor(private action: ActionSheetController) {
		this.socialForm = new FormGroup({
			social: this.socials
		});
	}

	addField() {
		let socailAction = this.action.create({
			title: 'Pick Social Type',
			buttons: [
				{
					text: 'Facebook',
					icon: 'logo-facebook',
					handler: () => {
						this.newField('fb: ');
					}
				},
				{
					text: 'Instagram',
					icon: 'logo-instagram',
					handler: () => {
						this.newField('instragram: ');
					}
				},
				{
					text: 'Twitter',
					icon: 'logo-twitter',
					handler: () => {
						this.newField('twiiter: ');
					}
				},
				{
					text: 'Custom',
					icon: 'laptop',
					handler: () => {
						this.newField('');
					}
				},
				{
					text: 'Cancel',
					icon: 'close-circle',
					role: 'cancel',
					cssClass: 'cancel'
				}
			]
		});
		socailAction.present();
	}

	newField(type: string) {
		this.socials.push(new FormControl(type));
	}

	socialAdded() {
		let added = this.socialForm.dirty;
		return added;
	}

	socialData() {
		return this.socialForm.value;
	}
}