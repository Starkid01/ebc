import { FormArray,  FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
	selector: 'ebc-social-form',
	templateUrl: 'submit-social.form.html'
})
export class SocialForm {
	socialForm: FormGroup;
	socials: FormArray = new FormArray([
		new FormControl('')
	])

	constructor() {
		this.socialForm = new FormGroup({
			social: this.socials
		});
	}

	addField() {
		this.socials.push(new FormControl(''));
	}

	socialAdded() {
		let added = this.socialForm.dirty;
		return added;
	}

	socialData() {
		return this.socialForm.value;
	}
}