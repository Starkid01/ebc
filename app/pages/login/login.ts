import {FORM_DIRECTIVES, Validators, NgFormModel, ControlGroup, Control} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {Page, NavController} from 'ionic-framework/ionic';
import {Type} from 'angular2/core';
import {CreatePage} from '../create/create';
import {SideMenu} from '../sidemenu/sidemenu';

@Page({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES]
})

export class LoginPage {
  signUp: Type = CreatePage;
  loginForm: ControlGroup;

  constructor(private nav: NavController) {
    this.nav = nav;
    this.loginForm = new ControlGroup({
      username: new Control('', Validators.required),
      password: new Control('', Validators.required)
    });
  }

  openPage(page){
    this.nav.push(page);
  }

  loggedIn(){
    let nav = this.nav;
    nav.setPages([{page: SideMenu}], {animate: true});
  }

  signIn(login){

  }
}
