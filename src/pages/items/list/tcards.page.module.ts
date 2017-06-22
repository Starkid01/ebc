import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TCardsPage } from './tcards.page';
import { NavModule } from '../../shared/nav';

@NgModule({
  declarations: [
    TCardsPage
  ],
  imports: [
    IonicPageModule.forChild(TCardsPage),
		NavModule
  ],
  entryComponents: [
   TCardsPage
  ]
})
export class TCardsPageModule {}