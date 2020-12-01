import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { createDate, getDifferenceDays } from './utils';
import { RateId } from './interfaces/order';
import { ErrorHandlerService } from './services/error-handler.service';

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
    if (!control.errors?.mask && control.value) {
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

export function rateControlTrigger(rateControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (rateControl.value && control.valid) {
      rateControl.updateValueAndValidity();
    }
    return null;
  };
}

export function isAfterDate(controlStartDate: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (controlStartDate.valid) {
      const day = createDate(control.value);
      const startDate = createDate(controlStartDate.value);
      if (day && day.toString() === 'Invalid Date') {
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

export function validPrice(
  dateFromControl: AbstractControl,
  dateToControl: AbstractControl,
  errorService: ErrorHandlerService
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateForm = createDate(dateFromControl.value);
    const dateTo = createDate(dateToControl.value);
    const lease = getDifferenceDays(+dateForm, +dateTo);
    if (control.value && (control.value as RateId).rateTypeId.name === 'На сутки') {
      if (lease.hour || lease.min) {
        errorService.userError('Выберите дату кратную дню, либо смените тариф.');
        control.reset();
      }
    }
    return null;
  };
}
