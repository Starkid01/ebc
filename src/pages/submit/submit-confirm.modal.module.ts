import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SubmitConfirm } from './submit-confirm.modal';

@NgModule({
	declarations: [
		SubmitConfirm
	],
	imports: [
		IonicPageModule.forChild(SubmitConfirm)
	],
	entryComponents: [
		SubmitConfirm
	]
})
export class SubmitConfirmModule { }