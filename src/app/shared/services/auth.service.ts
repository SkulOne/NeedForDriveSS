import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  test(): void {
    this.httpClient
      .post('http://api-factory.simbirsoft1.com/auth/login', {
        username: 'intern',
        password: 'intern-S!',
      })
      .subscribe((value) => console.log(value));
  }
}
