import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements OnInit {
  orderForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.orderForm = this.formBuilder.group({
      locationFormGroup: this.formBuilder.group({
        city: ['', Validators.required],
        pickupPoint: ['', Validators.required],
      }),
      carModelFormGroup: this.formBuilder.group({
        carCategory: ['Все', Validators.required],
        carModel: ['', Validators.required],
      }),
      additionallyFormGroup: this.formBuilder.group({
        color: ['Любой', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        rate: ['', Validators.required],
        additionally: [false],
      }),
    });
  }
}
