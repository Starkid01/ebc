import { Control, ControlGroup, Validators } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'ebc-social-form',
	templateUrl: 'build/pages/submit/forms/submit-social.form.html'
})
export class SocialForm {
	socialForm:ControlGroup;

	constructor() {
		this.socialForm = new ControlGroup({
			
		})
	}
}