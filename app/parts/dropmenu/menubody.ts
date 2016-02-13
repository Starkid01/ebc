import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'drop-menu',
  host: {
    '(mouseleave)': 'exit()',
    '(click)': 'exit()'
  },
  template:
  `<div class="menu enter" [style.transform-origin]="settings.origin">
      <div [hidden]="header" class="menu-title">{{settings.title}}</div>
      <div class="menu-item">
        <ng-content></ng-content>
      </div>
    </div>`,
  styles: [`
    .menu {
      display: flex;
      position: absolute;
      flex-direction: column;
      background: #fff;
      min-height: 13rem;
      min-width: 17rem;
      width: 100%;
      max-width: max-content;
      box-shadow: 0px 1px 5px rgba(11, 11, 11, .3);
      border-radius: .2em;
      transition: all .2s ease-in-out;
    }
    _:-ms-lang(x), .menu { max-width: 15em; }
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
      animation-duration: .6s;
    }
  `]
})

export class DropMenu {
  @Input() settings: Object;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();
  header: boolean;
  leave: boolean;

  ngOnInit(){
    this.settings = {};

    console.log();

    if(!this.settings.hasOwnProperty('title')){
      this.header = true;
    }

    if(!this.settings.hasOwnProperty('origin')){
      Object.defineProperty(this.settings, 'origin', { value: 'top right' });
    }
  }

  exit(){
    this.toggle.next(true);
  }
}
