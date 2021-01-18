import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouterDataService {
  private _data: unknown;
  constructor() {}
  get data(): unknown {
    return this._data;
  }

  set data(value: unknown) {
    this._data = value;
  }
}
