import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appValidDesc]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidDescDirective, multi: true}]
})
export class ValidDescDirective implements Validator{

  constructor() { }
  public validate(control:AbstractControl):{[key: string]: any}{
    let len = /^[a-zA-Z,0-9, ]{10,35}$/ ;
      let valid = len.test(control.value);
      return control.value < 1 || valid ? null :{'appValidDesc':true};
    
  }
}
