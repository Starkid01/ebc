import {Validators, ControlGroup, Control} from 'angular2/common';
import {Injectable} from 'angular2/core';


@Injectable()
export class Services {

  constructor() {

  }

  clearField(c: Control) {
    let field = c;

    field.updateValue(null);
    field.updateValueAndValidity();
    field.setErrors(null);
    field._pristine = true;
  }

  clearForm(g: ControlGroup){
    let form = g;

    for(let i in g.controls){
      let input = <Control>g.find(i);
      input.updateValue('');
      input.updateValueAndValidity();
      input._pristine = true;
    }
  }
}
