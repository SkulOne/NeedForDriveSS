export interface Car {
  priceMax: number;
  priceMin: number;
  name: string;
  thumbnail: CarPhoto;
  description: string;
  categoryId: CategoryId;
  colors: [string];
}

interface CarPhoto {
  mimetype: string;
  originalName: string;
  path: string;
  size: number;
}

interface CategoryId {
  description: string;
  id: string;
  name: CarCategory;
}

export type CarCategory = 'Все' | 'Эконом' | 'Премиум';
