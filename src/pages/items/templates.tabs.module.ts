import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Templates } from './templates.tabs';
import { NavModule } from '../shared/nav';
import { ShareModalComponentModule } from './share-modal';

@NgModule({
  declarations: [
    Templates
  ],
  imports: [
    IonicPageModule.forChild(Templates),
    NavModule,
    ShareModalComponentModule
  ],
  entryComponents: [
   Templates
  ]
})
export class TemplatesModule {}