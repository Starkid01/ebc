import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
	selector: 'ebc-social-form',
	templateUrl: 'submit-social.form.html'
})
export class SocialForm {
	dm: boolean = false;
	fb: FormControl = new FormControl('');
	fbField: boolean = false;
	gram: boolean = false;
	instagram: FormControl = new FormControl('');
	linked: boolean = false;
	linkedIn: FormControl = new FormControl('');
	socialForm: FormGroup;
	sound: boolean = false;
	soundCloud: FormControl = new FormControl('');
	spot: boolean = false;
	spotify: FormControl = new FormControl('');
	twitter: FormControl = new FormControl('');
	url: boolean = false;
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