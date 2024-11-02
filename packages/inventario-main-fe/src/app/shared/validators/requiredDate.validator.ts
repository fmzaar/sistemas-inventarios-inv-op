import {AbstractControl} from '@angular/forms';

export function requiredDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (!control.value) {
    return { 'required': true };
  }
  return null;
}
