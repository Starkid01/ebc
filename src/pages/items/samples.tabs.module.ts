import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Samples } from './samples.tabs';
import { ShareModalComponentModule } from './share-modal';

@NgModule({
  declarations: [
    Samples
  ],
  imports: [
    IonicPageModule.forChild(Samples),
    ShareModalComponentModule
  ],
  entryComponents: [
   Samples
  ]
})
export class SamplesModule {}