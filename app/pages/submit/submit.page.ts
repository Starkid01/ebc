import { Validators, NgFormModel, ControlGroup, Control } from '@angular/common';
import { Component } from '@angular/core';

import { BackandService, Services } from '../../services';
import { NavComponent } from '../shared/nav';

@Component({
  templateUrl: 'build/pages/submit/submit.page.html',
  directives: [NavComponent]
})

export class SubmitPage {
  subform:string = 'sample';

  constructor() {

  }
}
