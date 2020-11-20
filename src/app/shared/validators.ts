import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function autocompleteValidator(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (validOptions.indexOf(control.value) !== -1) {
      return null;
    }
    return { invalidAutocomplete: true };
  };
}

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.errors?.mask) {
      const day = createDate(control.value);
      const currentDat = new Date();
      if (day < currentDat) {
        return { irrelevantDate: true };
      }
      if (day.toString() === 'Invalid Date') {
        return { invalidDate: true };
      }
    }
    return null;
  };
}

export function isAfterDate(controlStartDate: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (controlStartDate.valid) {
      const day = createDate(control.value);
      const startDate = createDate(controlStartDate.value);
      if (day.toString() === 'Invalid Date') {
        return { invalidDate: true };
      }
      if (startDate > day) {
        return { afterDate: true };
      }
    } else {
      return { enterStartDate: true };
    }
  };
}

function createDate(dateString: string): Date {
  const dayAndTime = dateString.split(' ');
  dayAndTime[0] = swap(dayAndTime[0]);
  return new Date(dayAndTime.join(' '));

  function swap(date: string): string {
    const dayArray = date.split('.');
    const dayBuffer = dayArray[0];
    dayArray[0] = dayArray[1];
    dayArray[1] = dayBuffer;
    return dayArray.join('.');
  }
}
