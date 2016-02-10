import {Component, Input} from 'angular2/core';

@Component({
  selector: 'menu-item',
  template: `
    <button class="item">
      <ng-content></ng-content>
    </button>`
})

export class MenuItem {


  constructor() {

  }
}
