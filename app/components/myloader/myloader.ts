import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'up-loader',
  directives: [IONIC_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  template:
  `<div class="drop">
	<div class="loadBg">
		<ion-spinner name="crescent"></ion-spinner>
          <progress [value]="upload" max="100"></progress>
		<div>Uploading...{{upload}}%</div>
	</div>
  </div>`,
  styles: [`
    .drop {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(12, 12, 12, 0.3);
      z-index: 999;
    }
    .drop progress {
      width: 85%;
      margin-bottom: 1rem;
      margin-top: 1rem;
      border-radius: 2rem;
      border: 0;
    }
    .drop progress::-webkit-progress-bar {
      background-color: rgba(153, 153, 153, 0.1);
      border-radius: 1rem;
    }
    .drop progress[value] {
      color: #703869;
    }
    .drop progress[value]::-webkit-progress-value {
      background-color: #703869;
      border-radius: 1rem;
    }
    .drop circle {
      stroke: #11c1f3;
    }
    .drop .loadBg {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fafafa;
      width: 20rem;
      height: 11rem;
      border-radius: .25rem;
      box-shadow: 0.1rem 0.1rem 1rem rgba(11, 11, 11, 0.3);
    }
  `]
})

export class MyLoader {
  @Input('value') upload:number;
}
