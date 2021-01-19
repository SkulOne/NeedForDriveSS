import { CategoryId } from '@shared/interfaces/category';
import { CarPhoto } from '@shared/interfaces/car-photo';

export class Car {
  id?: string;
  categoryId: CategoryId;
  colors: string[];
  description: string;
  name: string;
  number: string;
  priceMax: number;
  priceMin: number;
  tank: number;
  thumbnail: CarPhoto;

  constructor(
    id?,
    name?,
    categoryId?,
    carNumber?,
    description?,
    priceMin?,
    priceMax?,
    tank?,
    colors?,
    thumbnail?
  ) {
    this.id = id;
    this.categoryId = categoryId ? categoryId : null;
    this.colors = colors ? colors : null;
    this.description = description ? description : null;
    this.name = name ? name : null;
    this.number = carNumber ? carNumber : null;
    this.priceMax = priceMax ? priceMax : null;
    this.priceMin = priceMin ? priceMin : null;
    this.tank = tank ? tank : null;
    this.thumbnail = thumbnail ? thumbnail : null;
  }
}
