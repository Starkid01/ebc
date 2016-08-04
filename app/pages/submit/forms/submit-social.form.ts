import { Control, ControlGroup, Validators } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'ebc-social-form',
	templateUrl: 'build/pages/submit/forms/submit-social.form.html'
})
export class SocialForm {
	fb:Control = new Control('');
	instagram:Control = new Control('');
	linkedIn:Control = new Control('');
	socialForm: ControlGroup;
	soundCloud:Control = new Control('');
	spotify: Control = new Control('');
	twitter:Control = new Control('');
	web:Control = new Control('');

	constructor() {
		this.socialForm = new ControlGroup({
			fb: this.fb,
			instagram: this.instagram,
			linkedIn: this.linkedIn,
			soundCloud: this.soundCloud,
			spotify: this.spotify,
			twitter: this.twitter,
			web: this.web
		})
	}

	socialAdded() {
		let added = this.socialForm.dirty;
		return added
	}

	socialData() {
		return this.socialForm.value;
	}
}