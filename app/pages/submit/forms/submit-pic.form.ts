import { Component } from '@angular/core';

import { PictureService } from '../../../services';
import { MyLoader } from '../../shared/myloader';

@Component({
	selector: 'ebc-pic-form',
	templateUrl: 'build/pages/submit/forms/submit-pic.form.html',
	directives: [MyLoader],
	providers: [PictureService]
})
export class PicForm {

	constructor(public pic: PictureService) {

	}

}