import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(passwordControlName: string): ValidatorFn {
  return (confirmPasswordControl: AbstractControl): ValidationErrors | null => {
    if (!confirmPasswordControl.parent) return null;
    const passwordControl = confirmPasswordControl.parent.get(passwordControlName);
    if (passwordControl && confirmPasswordControl.value !== passwordControl.value) {
      return { confirmPasswordMismatch: true };
    }
    return null;
  };
}
