import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function autocompleteValidator(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (validOptions.indexOf(control.value) !== -1) {
      return null;
    }
    return { invalidAutocomplete: true };
  };
}
