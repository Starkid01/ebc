import {Component, Input, Type, ViewChild} from '@angular/core';
import {NavController, LocalStorage, Storage} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {DropMenu, MenuItem} from '../../components/dropmenu/dropmenu';

@Component({
  selector: 'more-menu',
  templateUrl: 'build/pages/moremenu/moremenu.html',
  directives: [DropMenu, MenuItem]
})

export class MoreMenu {
  @ViewChild(DropMenu) drop:DropMenu;

  login:Type = LoginPage;
  local:any = new Storage(LocalStorage);

  constructor(public nav:NavController){
    this.local;
  }

  myToggle() {
    this.drop.close = !this.drop.close;
  }

  signOut() {
    let nav = this.nav;
    this.local.remove('jwt');
    nav.rootNav.setRoot(LoginPage);
  }
}
