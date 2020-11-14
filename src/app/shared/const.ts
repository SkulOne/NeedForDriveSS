import { HttpHeaders } from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    Authorization: 'Bearer 52efbe08228671240494f537f2486bc109a637b4',
  }),
};
