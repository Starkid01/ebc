import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { EditPage } from './editperson.page';
import { NavModule } from '../../shared/nav';

@NgModule({
  declarations: [
    EditPage
  ],
  imports: [
    IonicPageModule.forChild(EditPage),
		NavModule
  ],
  entryComponents: [
    EditPage
  ]
})
export class EditPageModule {}