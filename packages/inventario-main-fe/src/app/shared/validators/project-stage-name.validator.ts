import { AbstractControl, ValidatorFn } from '@angular/forms';

export function projectStageNameValidator(existingNames: string[], originalName?: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isTaken = existingNames.includes(control.value);
    if (isTaken) {
      if (originalName && control.value === originalName) {
        return null;
      }
      return {'nameExists': {value: control.value}};
    }
    return null;
  };
}
