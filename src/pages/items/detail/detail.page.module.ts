import { NgModule } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';
import { IonicPageModule } from 'ionic-angular';

import { DetailPage } from './detail.page';
import { EbcEmailComponentModule } from '../../../components/ebc-email/ebc-email.module';
import { EbcSmsComponentModule } from '../../../components/ebc-sms/ebc-sms.module';
import { EbcSvgComponentModule } from '../../../components/ebc-svg/ebc-svg.module';
import { NavModule } from '../../shared/nav';

@NgModule({
  declarations: [
    DetailPage
  ],
  imports: [
    EbcEmailComponentModule,
    EbcSmsComponentModule,
    EbcSvgComponentModule,
    IonicPageModule.forChild(DetailPage),
		NavModule
  ],
  entryComponents: [
    DetailPage
  ],
	providers: [
		Contacts
	]
})
export class DetailPageModule {}