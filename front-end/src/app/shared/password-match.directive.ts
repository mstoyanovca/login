import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  console.log("controlName = " + controlName);
  return (controls: AbstractControl): ValidationErrors | null => {
    const control = controls.get(controlName);
    const matchingControl = controls.get(matchingControlName);
    console.log("control = " + JSON.stringify(control));

    if (control === null || matchingControl === null || matchingControl.errors?.['mustMatch']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
      return { mustMatch: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}

@Directive({
  selector: '[passwordsMatcher]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true }],
})
export class PasswordMatchDirective implements Validator, OnChanges {
  @Input('passwordsMatcher') matchingControlName: string = '';
  @Input() controlName: string = '';
  validateFn: ValidatorFn = () => null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['matchingControlName'] || changes['controlName']) {
      this.validateFn = passwordMatchValidator(this.controlName, this.matchingControlName);
    }
  }

  registerOnValidatorChange(fn: () => void): void {
    // do nothing
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validateFn;
  }
}
