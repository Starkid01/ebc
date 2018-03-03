import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AuthInterceptorProvider } from '../../../providers/auth-interceptor/auth-interceptor';
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