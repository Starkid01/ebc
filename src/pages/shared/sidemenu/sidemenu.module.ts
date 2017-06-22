import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SideMenu } from './sidemenu';

@NgModule({
  declarations: [
    SideMenu
  ],
  imports: [
    IonicPageModule.forChild(SideMenu)
  ],
  entryComponents: [
   SideMenu
  ]
})
export class SideMenuModule {}