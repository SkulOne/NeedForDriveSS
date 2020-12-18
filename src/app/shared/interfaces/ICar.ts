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
// todo Вынеси
export interface CarPhoto {
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
}
// todo Вынеси
export interface CategoryId {
  description: string;
  id: string;
  name: string;
}
