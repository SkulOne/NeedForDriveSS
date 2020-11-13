import {City} from './city';
import LatLngLiteral = google.maps.LatLngLiteral;
import LatLng = google.maps.LatLng;

export interface Point {
  name: string;
  cityId: City;
  address: string;
  id: number;
  coords?: LatLngLiteral|LatLng;
}
