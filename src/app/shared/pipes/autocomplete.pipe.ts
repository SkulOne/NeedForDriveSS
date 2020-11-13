import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../interfaces/city';
import { Point } from '../interfaces/point';

@Pipe({
  name: 'autocomplete',
})
export class AutocompletePipe implements PipeTransform {
  transform(value: City[] | Point[], changedValue: string, type: string): City[] | Point[] {
    if (value != null) {
      const filterValue = changedValue.toLowerCase();
      if (type === 'Point') {
        return (value as Point[]).filter(
          (option) => option.address.toLowerCase().indexOf(filterValue) > -1
        );
      }
      if (type === 'City') {
        return (value as City[]).filter(
          (option) => option.name.toLowerCase().indexOf(filterValue) > -1
        );
      }
      return [];
    }
  }
}
