import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormHandler {

  areEqual(g: FormGroup) {
    let equal = g.value;
    const vals = Object.keys(equal).map(key => equal[key]);
    if (vals[0] !== vals[1]) {
      return { notEqual: true };
    } else {
      return null;
    }
  }

  emailValidator(c: AbstractControl) {
    let addy = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let isEmail = !c.value.match(addy);
    return isEmail ? { 'invalidEmail': true } : null;
  }

  phoneValidator(c: AbstractControl) {
    let numberEx = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    let isPhone = !c.value.match(numberEx);
    return isPhone ? { 'invalidPhone': true } : null;
  }

  clearField(c: FormControl) {
    let field = c;
    field.reset();
  }

  clearForm(g: FormGroup) {
    let form = g;
    form.reset();
  }
}