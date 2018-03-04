import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MigratePage } from './migrate';

@NgModule({
  declarations: [
    MigratePage,
  ],
  imports: [
    IonicPageModule.forChild(MigratePage),
  ],
})
export class MigratePageModule {}
