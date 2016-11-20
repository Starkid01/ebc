import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
	selector: 'ebc-social-form',
	templateUrl: 'submit-social.form.html'
})
export class SocialForm {
	fb: FormControl = new FormControl('');
	instagram: FormControl = new FormControl('');
	linkedIn: FormControl = new FormControl('');
	socialForm: FormGroup;
	soundCloud: FormControl = new FormControl('');
	spotify: FormControl = new FormControl('');
	twitter: FormControl = new FormControl('');
	web: FormControl = new FormControl('');

	constructor() {
		this.socialForm = new FormGroup({
			fb: this.fb,
			instagram: this.instagram,
			linkedIn: this.linkedIn,
			soundCloud: this.soundCloud,
			spotify: this.spotify,
			twitter: this.twitter,
			web: this.web
		});
	}

	socialAdded() {
		let added = this.socialForm.dirty;
		return added;
	}

	socialData() {
		return this.socialForm.value;
	}
}