import {Component, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'drop-menu',
  host: {
    '(document:click)': 'click($event)'
  },
  template:
    `<div class="menu enter" *ngIf="close" [style.transform-origin]="settings.origin">
      <div [hidden]="header" class="menu-title">{{settings.title}}</div>
      <div class="menu-item">
        <ng-content></ng-content>
      </div>
    </div>`,
  styles: [`
    .menu {
      display: flex;
      position: absolute;
      top: 1rem;
      right: 2rem;
      flex-direction: column;
      justify-content: flex-start;
      align-contents: center;
      background: #fff;
      min-height: 13rem;
      min-width: 12rem;
      width: 100%;
      max-width: max-content;
      box-shadow: 0px 1px 5px rgba(11, 11, 11, .3);
      border-radius: .2rem;
      transition: all .2s ease-in-out;
      z-index: 9999;
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

export class DropMenu implements OnInit {
  @Input() settings:Object;
  header:boolean;
  close:boolean = false;

  ngOnInit() {
    this.settings = {};

    if(!this.settings.hasOwnProperty('visible')){
      this.header = true;
    }

    if(!this.settings.hasOwnProperty('origin')){
      Object.defineProperty(this.settings, 'origin', { value: 'top right' });
    }
  }

  click(e) {
    let click = e.target;
    let inside = false;
    let toggle = false;
    do {
      if(click === self) {
        inside = true;
      }
      if(click === document.getElementsByClassName('more')[0] || click === document.getElementsByClassName('more')[1]) {
        toggle = true;
      }
      click = click.parentNode;
    } while (click);
    if(inside) {
      this.close = false;
    } else if(!toggle) {
      this.close = false;
    }
  }
}
