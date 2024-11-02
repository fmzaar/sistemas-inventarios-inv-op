import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minImagesValidator(minCount: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const files: File[] = control.value;
    if (files && files.length < minCount) {
      return { 'notEnoughImages': true };
    }
    return null;
  };
}
