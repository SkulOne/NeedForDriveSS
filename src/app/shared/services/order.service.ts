import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  address = new Subject<string>();

  constructor() {
  }
}
