import {Page, NavController} from 'ionic-framework/ionic';
import {Type} from 'angular2/core';
import {FORM_DIRECTIVES, Validators, NgFormModel} from 'angular2/common';
import {CreatePage} from '../create/create';
import {SideMenu} from '../sidemenu/sidemenu';

@Page({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES]
})

export class LoginPage {
  signUp: Type = CreatePage;

constructor(private nav: NavController) {
    this.nav = nav;
  }

  openPage(page){
    this.nav.push(page);
  }

  loggedIn(){
    let nav = this.nav;
    nav.setPages([{page: SideMenu}], {animate: true});
  }
}
