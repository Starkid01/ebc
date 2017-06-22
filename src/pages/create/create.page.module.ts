import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CreatePage } from './create.page';
import { NavModule } from '../shared';

@NgModule({
  declarations: [
    CreatePage
  ],
  imports: [
    IonicPageModule.forChild(CreatePage),
		NavModule
  ],
  entryComponents: [
    CreatePage
  ]
})
export class CreatePageModule {}