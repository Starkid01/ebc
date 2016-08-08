import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { PopoverMenu } from './popover.menu';

@Component({
  selector: 'ebc-navbar',
  templateUrl: 'build/pages/shared/nav/nav.component.html'
})

export class NavComponent {
  constructor(private pop: PopoverController, private nav: NavController) {

  }

  menuOpen(click) {
    let menu = this.pop.create(PopoverMenu);
    menu.present({
      ev: click
    });
  }
}