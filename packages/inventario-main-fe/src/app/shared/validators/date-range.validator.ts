import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  // @ts-ignore
  const initDate = control.get('initDate').value;
  // @ts-ignore
  const deadDate = control.get('deadDate').value;

  if (initDate && deadDate && initDate >= deadDate) {
    return { 'dateRange': true };  // Si la fecha de inicio es posterior o igual a la fecha de finalización, se considera un error.
  }
  return null;
}
