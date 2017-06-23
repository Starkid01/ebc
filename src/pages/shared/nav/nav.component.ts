import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { PopoverMenu } from './popover.menu';

@Component({
  selector: 'ebc-navbar',
  templateUrl: 'nav.component.html'
})

export class NavComponent {
  constructor(private pop: PopoverController) {

  }

  menuOpen(click) {
    let menu = this.pop.create(PopoverMenu);
    menu.present({
      ev: click
    });
  }
}