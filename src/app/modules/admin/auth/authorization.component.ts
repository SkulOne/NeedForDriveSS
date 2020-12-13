import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '@shared/services/authorization.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent implements OnInit {
  authorizationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.authorizationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.authorizationService.auth(this.authorizationForm.value, '/admin');
  }
}
