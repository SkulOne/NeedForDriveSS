import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '@shared/services/authorization.service';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  authorizationForm: FormGroup;
  @ViewChild('submitBtn') submitBtn: ElementRef;

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
  }

  login(): void {
    this.submitBtn.nativeElement.disabled = true;
    this.authorizationService
      .auth(this.authorizationForm.value)
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        this.authorizationService.setToken(response);
        this.submitBtn.nativeElement.disabled = false;
        this.router.navigate(['/admin']);
      });
  }

  ngOnDestroy(): void {}
}
