import {Component, Input, SimpleChange, Output, EventEmitter, Type, ViewChild} from 'angular2/core';
import {NavController, LocalStorage, Storage} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {DropMenu, MenuItem} from '../../components/dropmenu/dropmenu';

@Component({
  selector: 'more-menu',
  templateUrl: 'build/pages/moremenu/moremenu.html',
  directives: [DropMenu, MenuItem]
})

export class MoreMenu {
  @Input() visible: boolean;
  @Output('more') visibleChange: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(DropMenu) drop:DropMenu;

  show: boolean;
  ch: Object;
  login:Type = LoginPage;
  local:any = new Storage(LocalStorage);

  constructor(public nav:NavController){
    this.local;
  }

  ngOnChanges(c: SimpleChange){
    let ch = c;
    for(let i in ch){
      this.show = ch[i].currentValue;
    }
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
