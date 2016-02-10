import {Component, Input} from 'angular2/core';

@Component({
  selector: 'drop-menu',
  template: `
    <div class="menu">
  <div class="menu-title">{{title}}</div>
      <div class="menu-item">
        <ng-content></ng-content>
      </div>
    </div>`,
  styles: [`
    .menu {
      display: flex;
      flex-direction: column;
      position: relative;
      background: #fff;
      min-height: 75px;
      max-width: 175px;
      box-shadow: 0px 1px 3px rgba(11, 11, 11, .3);
      border-radius: .2em;
    }
    .menu-title {
      font-weight: 600;
      text-align: center;
      padding: 1em;
    }
  `]
})

export class DropMenu {
  @Input() title: string;

  constructor() {

  }
}
