import {Component, Input, SimpleChange, Output, EventEmitter} from 'angular2/core';
import {DropMenu, MenuItem} from '../../parts/dropmenu/dropmenu';

@Component({
  selector: 'more-menu',
  templateUrl: 'build/pages/moremenu/moremenu.html',
  directives: [DropMenu, MenuItem]
})

export class MoreMenu {
  @Input() visible: boolean;
  @Output('more') visibleChange: EventEmitter<boolean> = new EventEmitter();

  show: boolean;
  ch: Object;

  ngOnChanges(c: SimpleChange){
    let ch = c;
    for(let i in ch){
      this.show = ch[i].currentValue;
    }
  }

  myToggle(h: boolean){
    this.show = h;
    this.visibleChange.emit(h);
  }
}
