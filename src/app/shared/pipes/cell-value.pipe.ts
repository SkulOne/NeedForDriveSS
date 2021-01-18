import { Pipe, PipeTransform } from '@angular/core';
import { TableHeader } from '@shared/interfaces/table-header';

@Pipe({
  name: 'cellValue',
})
export class CellValuePipe<T> implements PipeTransform {
  transform(entity: T, value: TableHeader): string {
    if (entity) {
      if (!entity[value.matColumnDef]) {
        return value.property?.reduce((acc: string, currentValue) => {
          return acc ? acc[currentValue] : null;
        }, entity);
      }
      if (value?.property) {
        return value.property?.reduce((acc: string, currentValue) => {
          return acc[currentValue];
        }, entity[value.matColumnDef]);
      }
      return entity[value.matColumnDef];
    }
    return null;
  }
}
