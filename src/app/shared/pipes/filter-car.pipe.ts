import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '@shared/classes/car';

@Pipe({
  name: 'filterCar',
})
export class FilterCarPipe implements PipeTransform {
  transform(cars: Car[], category: string): Car[] {
    if (category !== 'Все' && category !== null) {
      return cars.filter((car) => car.categoryId.name === category);
    }
    return cars;
  }
}
