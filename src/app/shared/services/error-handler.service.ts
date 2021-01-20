import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  handleHttpError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      this.userError(error.error.message);
    } else {
      console.warn(`Error Code: ${error.status}\nMessage:${error.message}`);
    }
    this.router.navigate([this.router.url, 'error']);
    return throwError('Something bad happened; please try again later.');
  }

  userError(message: string): void {
    this.snackBar.open(message, 'Ok!', { duration: 5000 });
  }
}
