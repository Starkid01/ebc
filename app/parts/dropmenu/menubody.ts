import {Component, Input, Attribute} from 'angular2/core';

@Component({
  selector: 'drop-menu',
  template: `
    <div class="menu enter">
      <div [hidden]="header" class="menu-title">{{title}}</div>
      <div (click)="post()" class="menu-item">
        <ng-content></ng-content>
      </div>
    </div>`,
  styles: [`
    .menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 4rem;
      background: #fff;
      min-height: 13rem;
      min-width: 17rem;
      width: 100%;
      max-width: max-content;
      box-shadow: 0px 1px 5px rgba(11, 11, 11, .3);
      border-radius: .2em;
      transform-origin: top right;
      transition: all .2s ease-in-out;
    }
    .menu-title {
      font-weight: 600;
      text-align: center;
      padding: 1rem;
    }
    @keyframes grow {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .enter {
      animation-name: grow;
      animation-duration: 1s;
    }
  `]
})

export class DropMenu {
  @Input() title: string;
  header: boolean;

constructor(@Attribute('title') private menuTitle:string) {
    this.menuTitle = menuTitle;
  }

  post(event){
    console.log('here');
  }
}
