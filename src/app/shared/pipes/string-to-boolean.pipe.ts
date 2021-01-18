import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToBoolean',
})
export class StringToBooleanPipe implements PipeTransform {
  transform(value: string): unknown {
    return value ? 'Да' : 'Нет';
  }
}
