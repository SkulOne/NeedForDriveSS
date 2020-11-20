import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { OrderService } from '../../../../shared/services/order.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { dateValidator } from '../../../../shared/validators';
// import { dateValidator } from '../../../../shared/validators';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') private stepper: MatStepper;
  orderForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private orderService: OrderService) {}

  ngOnInit(): void {
    this.initForms();

    this.orderService.stepperIndex
      .pipe(untilDestroyed(this))
      .subscribe((index) => this.goToStep(index));
  }

  ngOnDestroy(): void {}

  private initForms(): void {
    this.orderForm = this.formBuilder.group({
      locationFormGroup: this.formBuilder.group({
        city: ['test', Validators.required],
        pickupPoint: ['test', Validators.required],
      }),
      carModelFormGroup: this.formBuilder.group({
        carCategory: ['Все', Validators.required],
        carModel: ['test', Validators.required],
      }),
      additionallyFormGroup: this.formBuilder.group({
        color: ['Любой', Validators.required],
        startDate: ['', [Validators.required, dateValidator()]],
        endDate: ['', [Validators.required, dateValidator()]],
        rate: ['', Validators.required],
        additionally: [false],
      }),
    });
  }

  private goToStep(index: number): void {
    this.stepper.selectedIndex = index;
  }
}
