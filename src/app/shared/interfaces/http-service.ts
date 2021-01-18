import { Observable } from 'rxjs';

export interface HttpService<T> {
  getAll(): Observable<T[]>;
  get(id: string): Observable<T>;
  post(entity: T): Observable<T>;
  put(entity: T, id?: string): Observable<T>;
  delete(id: string): Observable<void | object>;
}
