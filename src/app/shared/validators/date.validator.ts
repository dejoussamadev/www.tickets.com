import {AbstractControl} from '@angular/forms';

export function dateValidator(control: AbstractControl): { invalidDate: boolean } | null {
  const isValid = !isNaN(Date.parse(control.value));
  return isValid ? null : { invalidDate: true };
}
