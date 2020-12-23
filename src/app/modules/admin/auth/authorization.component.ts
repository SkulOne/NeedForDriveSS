import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '@shared/services/authorization.service';
import { Router } from '@angular/router';
import { of, OperatorFunction, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '@shared/services/error-handler.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  authorizationForm: FormGroup;
  loginTrigger = new Subject<void>();
  login$ = this.loginTrigger.asObservable();
  showSpinner: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService,
    private router: Router,
    private errorService: ErrorHandlerService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authorizationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.login$
      .pipe(
        untilDestroyed(this),
        switchMap(() =>
          this.authorizationService
            .auth(this.authorizationForm.value)
            .pipe(this.authErrorHandling())
        )
      )
      .subscribe((response) => {
        if (response) {
          this.authorizationService.setToken(response);
          this.router.navigate(['/admin']);
        }
        this.showSpinner = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  login(): void {
    this.showSpinner = true;
    this.loginTrigger.next();
  }

  ngOnDestroy(): void {}

  private authErrorHandling(): OperatorFunction<unknown, any> {
    return catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        localStorage.setItem('tokens', null);
        this.errorService.userError(
          'Ошибка авторизации! Пожалуйста, проверьте правильность написания почты и пароля.'
        );
        return of(null);
      }
      return throwError('Auth error');
    });
  }
}
