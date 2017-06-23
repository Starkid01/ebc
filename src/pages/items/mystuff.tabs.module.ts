import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MyStuff } from './mystuff.tabs';
import { NavModule } from '../shared/nav';
import { ShareModalComponentModule } from './share-modal';

@NgModule({
  declarations: [
    MyStuff
  ],
  imports: [
    IonicPageModule.forChild(MyStuff),
    NavModule,
    ShareModalComponentModule
  ],
  entryComponents: [
   MyStuff
  ]
})
export class MyStuffModule {}