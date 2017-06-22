import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TFlysPage } from './tflyers.page';
import { NavModule } from '../../shared/nav';

@NgModule({
  declarations: [
    TFlysPage
  ],
  imports: [
    IonicPageModule.forChild(TFlysPage),
		NavModule
  ],
  entryComponents: [
   TFlysPage
  ]
})
export class TFlysPageModule {}