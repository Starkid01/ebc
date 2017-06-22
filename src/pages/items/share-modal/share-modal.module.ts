import { NgModule } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';
import { IonicPageModule } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ShareModalComponent } from './share-modal';

@NgModule({
	declarations: [
		ShareModalComponent
	],
	imports: [
		IonicPageModule.forChild(ShareModalComponent)
	],
	entryComponents: [
		ShareModalComponent
	],
	providers: [
		Contacts,
    SocialSharing
	]
})
export class ShareModalComponentModule { }