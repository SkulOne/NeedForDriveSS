import { Pipe, PipeTransform } from '@angular/core';
import { ICar } from '../interfaces/ICar';

@Pipe({
  name: 'filterCar',
})
export class FilterCarPipe implements PipeTransform {
  transform(cars: ICar[], category: string): ICar[] {
    if (category !== 'Все' && category !== null) {
      return cars.filter((car) => car.categoryId.name === category);
    }
    return cars;
  }
}
