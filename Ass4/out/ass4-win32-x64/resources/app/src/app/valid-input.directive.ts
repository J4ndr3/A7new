import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appValidInput]',

  providers: [{provide: NG_VALIDATORS, useExisting: ValidInputDirective, multi: true}]
})
export class ValidInputDirective implements Validator{

  constructor() { }
    public validate(control:AbstractControl):{[key: string]: any}{
      let len = /^[a-zA-Z,0-9]{7,10}$/ ;
      let valid = len.test(control.value);
      return control.value < 1 || valid ? null :{'appValidInput':true};
    }

}
