import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Samples } from './samples.tabs';
import { NavModule } from '../shared/nav';
import { ShareModalComponentModule } from './share-modal';

@NgModule({
  declarations: [
    Samples
  ],
  imports: [
    IonicPageModule.forChild(Samples),
    NavModule,
    ShareModalComponentModule
  ],
  entryComponents: [
   Samples
  ]
})
export class SamplesModule {}