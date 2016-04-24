import {Component, Input} from 'angular2/core';

@Component({
  selector: 'menu-item',
  template: `
    <button class="item">
      <ng-content></ng-content>
    </button>`,
  styles: [`
    .item {
      text-align: center;
      width: 100%;
    }
  `]
})

export class MenuItem {

}
