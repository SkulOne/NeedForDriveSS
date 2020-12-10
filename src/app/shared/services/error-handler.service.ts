import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private snackBar: MatSnackBar) {}

  handleHttpError(error: HttpErrorResponse): Observable<never> {
    const message = error.error instanceof ErrorEvent ? error.error.message : error.error;
    console.warn(message);
    this.snackBar.open(message, 'Ok!', { duration: 5000 });
    return throwError('Something bad happened; please try again later.');
  }

  userError(message: string): void {
    this.snackBar.open(message, 'Ok!', { duration: 5000 });
  }
}
