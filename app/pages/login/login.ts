import {Page, NavController} from 'ionic-framework/ionic';
import {Type} from 'angular2/core';
import {CreatePage} from '../create/create';
import {SideMenu} from '../sidemenu/sidemenu';
import {DropMenu, MenuItem} from '../../parts/dropmenu/dropmenu';

@Page({
  templateUrl: 'build/pages/login/login.html',
  directives: [DropMenu, MenuItem]
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
