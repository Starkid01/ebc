import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PrivatePolicyPage } from './private-policy';

@NgModule({
  declarations: [
    PrivatePolicyPage
  ],
  imports: [
    IonicPageModule.forChild(PrivatePolicyPage)
  ],
  entryComponents: [
    PrivatePolicyPage
  ]
})
export class PrivatePolicyPageModule {}