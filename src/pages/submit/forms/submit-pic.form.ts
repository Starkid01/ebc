import { Component, DoCheck } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { PictureService, UploadOpts } from '../../../providers/myservices';

@Component({
	selector: 'ebc-pic-form',
	templateUrl: 'submit-pic.form.html'
})
export class PicForm implements DoCheck {
	art: string = '';
	image: string;
	notAdded: boolean = true;

	constructor(private fireAuth: AngularFireAuth, private pic: PictureService) { }

	ngDoCheck() {
		this.art = this.pic.picFile;
	}

	getArt() {
		;
		return this.image;
	}

	savePic() {
		let picOpt: UploadOpts = {
			upload_preset: 'usersPic',
			tags: [this.fireAuth.auth.currentUser.displayName]
		}
		this.pic.uploadImg(picOpt)
			.subscribe(
				data => {
					this.image = data['secure_url'];
					this.pic.picSaved();
					this.art = this.image;
					this.notAdded = false;
				},
				err => {
					this.pic.picSaved();
					console.log(err);
				});
	}
}