import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DeepItemPage } from './deep-item';
import { EbcSvgComponentModule } from '../../components/ebc-svg/ebc-svg.module';
import { NavModule } from '../shared/nav';

@NgModule({
  declarations: [
    DeepItemPage,
  ],
  imports: [
    EbcSvgComponentModule,
    IonicPageModule.forChild(DeepItemPage),
    NavModule
  ],
  exports: [
    DeepItemPage
  ]
})
export class DeepItemPageModule {}
