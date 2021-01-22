import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autocomplete',
})
export class AutocompletePipe implements PipeTransform {
  transform(value: unknown[], changedValue: string, field: string): unknown[] {
    if (value != null && changedValue) {
      const filterValue = changedValue.toLowerCase();
      return value.filter((option) => option[field].toLowerCase().indexOf(filterValue) > -1);
    }
    return value;
  }
}
