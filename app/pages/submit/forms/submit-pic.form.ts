import { Component } from '@angular/core';

import { PictureService, UserService } from '../../../services';

@Component({
	selector: 'ebc-pic-form',
	templateUrl: 'build/pages/submit/forms/submit-pic.form.html'
})
export class PicForm {
	art: string;
	hasArt: boolean = false;

	constructor(public pic: PictureService, public user: UserService) {

	}

	getArt() {
		this.hasArt = false;
		return this.art;
	}

	savePic() {
		console.log('Saving');
		let signed;
    this.pic.getSigned('usersItem', this.user.myUser)
      .subscribe(
			data => {
				signed = JSON.parse(data['_body']);
			},
			err => {
				console.log(err);
			},
			() => {
				this.pic.upload(signed, this.success);
			});
  }

	success = (result: any) => {
    let finish = JSON.parse(result.response);
    let image = finish['url'];
    console.log(image);
    this.pic.picSaved();
		this.art = image;
		this.hasArt = true;
  }
}