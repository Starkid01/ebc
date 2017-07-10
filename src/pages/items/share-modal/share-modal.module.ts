import { NgModule } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';
import { IonicPageModule } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { EbcEmailComponentModule } from '../../../components/ebc-email/ebc-email.module';
import { EbcSmsComponentModule } from '../../../components/ebc-sms/ebc-sms.module';
import { ShareModalComponent } from './share-modal';

@NgModule({
	declarations: [
		ShareModalComponent
	],
	imports: [
		EbcEmailComponentModule,
		EbcSmsComponentModule,
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