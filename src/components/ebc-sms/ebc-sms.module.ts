import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { EbcSmsComponent } from './ebc-sms';

@NgModule({
  declarations: [
    EbcSmsComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    EbcSmsComponent
  ]
})
export class EbcSmsComponentModule {}
