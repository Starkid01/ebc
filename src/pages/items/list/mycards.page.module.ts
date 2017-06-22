import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MyCardsPage } from './mycards.page';
import { NavModule } from '../../shared/nav';

@NgModule({
  declarations: [
    MyCardsPage
  ],
  imports: [
    IonicPageModule.forChild(MyCardsPage),
		NavModule
  ],
  entryComponents: [
   MyCardsPage
  ]
})
export class MyCardsPageModule {}