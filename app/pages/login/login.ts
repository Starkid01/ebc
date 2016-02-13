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
  show: boolean;
  moreMenu: Array<any>;
  drop: Object;

  constructor(private nav: NavController) {
    this.nav = nav;
    this.show = true;
    this.drop = {

    };
    this.moreMenu = [
      {name: 'One'},
      {name: 'Two'}
    ]
  }

  openPage(page){
    this.nav.push(page);
  }

  menu(){
    this.show = !this.show;
  }

  hide(g){
    this.show = g;
  }

  loggedIn(){
    let nav = this.nav;
    nav.setPages([{page: SideMenu}], {animate: true});
  }
}
