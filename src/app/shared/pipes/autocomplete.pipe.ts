import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autocomplete',
})
export class AutocompletePipe implements PipeTransform {
  transform(value: unknown[], changedValue: string, field: 'address' | 'name'): unknown[] {
    if (value != null) {
      const filterValue = changedValue.toLowerCase();
      return value.filter((option) => option[field].toLowerCase().indexOf(filterValue) > -1);
    }
  }
}
