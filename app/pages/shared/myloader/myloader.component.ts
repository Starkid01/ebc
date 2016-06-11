import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular';

@Component({
  selector: 'ebc-uploader',
  directives: [IONIC_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  template:
  `<div class="drop">
	<div class="loadBg">
		<ion-spinner name="crescent"></ion-spinner>
          <progress [value]="upload" max="100"></progress>
		<div>Uploading...{{upload}}%</div>
	</div>
  </div>`,
  styleUrls: ['build/css/app.md.css']
})

export class MyLoader {
  @Input('value') upload:number;
}
