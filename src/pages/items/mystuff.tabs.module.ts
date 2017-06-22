import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MyStuff } from './mystuff.tabs';
import { ShareModalComponentModule } from './share-modal';

@NgModule({
  declarations: [
    MyStuff
  ],
  imports: [
    IonicPageModule.forChild(MyStuff),
    ShareModalComponentModule
  ],
  entryComponents: [
   MyStuff
  ]
})
export class MyStuffModule {}