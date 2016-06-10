import { Component } from '@angular/core';
import { NavController, Popover } from 'ionic-angular';

import { PopoverMenu } from './popover.menu';

@Component({
  selector: 'ebc-navbar',
  templateUrl: 'build/pages/shared/nav/nav.component.html'
})

export class NavComponent {
  constructor(private nav:NavController){

  }

  menuOpen(click) {
    let menu = Popover.create(PopoverMenu);
    this.nav.present(menu, {
      ev: click
    });
  }
}
