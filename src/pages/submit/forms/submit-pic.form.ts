import { Component } from '@angular/core';

import { PictureService, UserService } from '../../../providers/myservices';

@Component({
	selector: 'ebc-pic-form',
	templateUrl: 'submit-pic.form.html'
})
export class PicForm {
	art: string = '';

	constructor(public pic: PictureService, public user: UserService) {

	}

	getArt() {
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
  }
}