import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '@shared/services/authorization.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  authorizationForm: FormGroup;
  loginTrigger = new Subject<void>();
  loginObservable = this.loginTrigger.asObservable();
  showSpinner: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authorizationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loginObservable
      .pipe(switchMap(() => this.authorizationService.auth(this.authorizationForm.value)))
      .subscribe((response) => {
        this.authorizationService.setToken(response);
        this.showSpinner = true;
        this.router.navigate(['/admin']);
      });
  }

  login(): void {
    this.showSpinner = true;
    this.loginTrigger.next();
  }

  ngOnDestroy(): void {}
}
