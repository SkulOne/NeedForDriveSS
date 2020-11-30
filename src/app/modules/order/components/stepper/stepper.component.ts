import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { OrderService } from '../../../../shared/services/order.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {
  dateValidator,
  isAfterDate,
  rateControlTrigger,
  validPrice,
} from '../../../../shared/validators';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  @ViewChild('stepper') private stepper: MatStepper;

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
        carCategory: ['Все'],
        carModel: ['test', Validators.required],
      }),
      additionallyFormGroup: this.formBuilder.group({
        color: ['Любой'],
        dateFrom: ['12.12.2020 12:12', [Validators.required]],
        dateTo: ['13.12.2020 12:12', [Validators.required, dateValidator()]],
        rateId: ['', Validators.required],
        additionallyServices: this.formBuilder.group({
          isFullTank: null,
          isNeedChildChair: null,
          isRightWheel: null,
        }),
      }),
    });
    this.setValidators();
  }

  private goToStep(index: number): void {
    this.stepper.selectedIndex = index;
  }

  private setValidators(): void {
    this.orderForm
      .get('additionallyFormGroup')
      .get('dateFrom')
      .setValidators([
        rateControlTrigger(this.orderForm.get('additionallyFormGroup').get('rateId')),
        dateValidator(),
      ]);
    this.orderForm
      .get('additionallyFormGroup')
      .get('dateTo')
      .setValidators([
        isAfterDate(this.orderForm.get('additionallyFormGroup').get('dateFrom')),
        dateValidator(),
      ]);
    this.orderForm
      .get('additionallyFormGroup')
      .get('rateId')
      .setValidators(
        validPrice(
          this.orderForm.get('additionallyFormGroup').get('dateFrom'),
          this.orderForm.get('additionallyFormGroup').get('dateTo')
        )
      );
  }
}
