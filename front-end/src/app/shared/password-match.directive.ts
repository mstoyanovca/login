import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[passwordMatch]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PasswordMatchDirective),
    multi: true
  }]
})
export class PasswordMatchDirective implements Validator {
  @Input('passwordMatch') passwordField: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get(this.passwordField)?.value;
    const confirmedPassword = control.value;

    if (password && confirmedPassword && !confirmedPassword.errors?.['passwordMismatch'] && password !== confirmedPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
