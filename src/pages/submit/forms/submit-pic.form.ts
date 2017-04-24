import { Component, DoCheck } from '@angular/core';

import { PictureService, UserService } from '../../../providers/myservices';

@Component({
	selector: 'ebc-pic-form',
	templateUrl: 'submit-pic.form.html'
})
export class PicForm implements DoCheck {
	art: string = '';
	notAdded: boolean = true;

	constructor(public pic: PictureService, public user: UserService) { }

	ngDoCheck() {
		this.art = this.pic.picFile;
	}

	getArt() {
		return this.art;
	}

	savePic() {
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
		this.notAdded = false;
  }
}