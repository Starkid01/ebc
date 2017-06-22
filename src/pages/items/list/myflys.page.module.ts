import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MyFlysPage } from './myflys.page';
import { NavModule } from '../../shared/nav';

@NgModule({
  declarations: [
    MyFlysPage
  ],
  imports: [
    IonicPageModule.forChild(MyFlysPage),
		NavModule
  ],
  entryComponents: [
   MyFlysPage
  ]
})
export class MyFlysPageModule {}