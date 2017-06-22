import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PersonPage } from './myperson.page';
import { NavModule } from '../../shared/nav';

@NgModule({
  declarations: [
    PersonPage
  ],
  imports: [
    IonicPageModule.forChild(PersonPage),
		NavModule
  ],
  entryComponents: [
    PersonPage
  ]
})
export class PersonPageModule {}