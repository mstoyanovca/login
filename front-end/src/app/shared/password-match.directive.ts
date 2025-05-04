import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

providers: [{provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true}],
})

@Directive({
  selector: '[passwordMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true}],
})
export class PasswordMatchDirective implements Validator {
    password = input<string>('', {alias: 'password'});
    confirmedPassword = input<string>('', {alias: 'confirmPassword'});

    validate(control: AbstractControl): ValidationErrors | null {
        if (!password || !confirmedPassword) {
            return null;
        }

        return password.value === confirmedPassword.value ? null : { passwordMismatch: true };
      }
}
