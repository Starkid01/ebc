import { Component, DoCheck } from '@angular/core';

import { PictureService, UserService } from '../../../providers/myservices';

@Component({
	selector: 'ebc-pic-form',
	templateUrl: 'submit-pic.form.html'
})
export class PicForm implements DoCheck {
	art: string = '';
	image: string;
	notAdded: boolean = true;

	constructor(public pic: PictureService, public user: UserService) { }

	ngDoCheck() {
		this.art = this.pic.picFile;
	}

	getArt() {;
		return this.image;
	}

	savePic() {
    this.pic.getSigned('usersItem', this.user.myUser)
      .subscribe(
			signed => {
				this.pic.upload(signed, this.success);
			},
			err => {
				console.log(err);
			});
  }

	success = (result: any) => {
    this.image = result;
    this.pic.picSaved();
		this.art = this.image;
		this.notAdded = false;
  }
}