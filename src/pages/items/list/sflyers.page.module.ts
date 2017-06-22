import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SFlysPage } from './sflyers.page';
import { NavModule } from '../../shared/nav';

@NgModule({
  declarations: [
    SFlysPage
  ],
  imports: [
    IonicPageModule.forChild(SFlysPage),
		NavModule
  ],
  entryComponents: [
   SFlysPage
  ]
})
export class SFlysPageModule {}