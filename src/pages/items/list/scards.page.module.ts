import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SCardsPage } from './scards.page';
import { NavModule } from '../../shared/nav';

@NgModule({
  declarations: [
    SCardsPage
  ],
  imports: [
    IonicPageModule.forChild(SCardsPage),
		NavModule
  ],
  entryComponents: [
   SCardsPage
  ]
})
export class SCardsPageModule {}