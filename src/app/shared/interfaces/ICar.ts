export interface ICar {
  id?: string;
  priceMax: number;
  priceMin: number;
  name: string;
  thumbnail: CarPhoto;
  description: string;
  categoryId: CategoryId;
  colors: string[];
  number: string;
  tank: number;
}
export interface CarPhoto {
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
}

export interface CategoryId {
  description: string;
  id?: string;
  name: string;
}
