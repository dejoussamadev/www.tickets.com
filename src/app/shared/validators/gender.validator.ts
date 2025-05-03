import {AbstractControl} from '@angular/forms';

export function genderValidator(control: AbstractControl): { invalidGender: boolean } | null {
  return ['male', 'female'].includes(control.value) ? null : { invalidGender: true };
}
