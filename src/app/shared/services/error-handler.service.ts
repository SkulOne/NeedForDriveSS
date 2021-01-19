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
    if (error.error instanceof ErrorEvent) {
      this.userError(error.error.message);
    } else {
      console.warn(`Error Code: ${error.status}\nMessage:${error.message}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  userError(message: string): void {
    this.snackBar.open(message, 'Ok!', { duration: 5000 });
  }
}
