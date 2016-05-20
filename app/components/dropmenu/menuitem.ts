import {Component} from 'angular2/core';

@Component({
  selector: 'menu-item',
  template: `
    <button block clear>
      <ng-content></ng-content>
    </button>`
})

export class MenuItem {

}
