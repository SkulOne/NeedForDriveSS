import { Pipe, PipeTransform } from '@angular/core';
import { TableHeader } from '@shared/interfaces/table-header';

@Pipe({
  name: 'cellValue',
})
export class CellValuePipe<T> implements PipeTransform {
  transform(entity: T, value: TableHeader): string {
    if (entity) {
      if (value?.property) {
        return value.property?.reduce(
          (acc: unknown, currentValue) => (acc ? acc[currentValue] : null),
          entity
        );
      }
      return entity[value.matColumnDef];
    }
    return null;
  }
}
