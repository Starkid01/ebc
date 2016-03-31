import {Validators, ControlGroup, Control} from 'angular2/common';
import {Injectable} from 'angular2/core';


@Injectable()
export class Services {

  constructor() {

  }

  areEqual(g: Control) {
    let equal = g.value;
    const vals = Object.keys(equal).map(key => equal[key]);
    if(vals[0] != vals[1]){
      return {notEqual: true};
    }
    else{
      return null;
    }
  }

  emailValidator(c: Control) {
    if (!c.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return { 'invalidEmailAddress': true };

    } else {
      return null;
    }
  }

  clearField(c: Control) {
    let field = c;

    field.updateValue('');
    field.updateValueAndValidity();
    //field.setErrors(null);
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
