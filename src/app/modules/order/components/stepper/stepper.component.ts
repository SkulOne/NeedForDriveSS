import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { OrderService } from '../../../../shared/services/order.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { dateValidator, rateControlTrigger, validPrice } from '../../../../shared/validators';

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
        carCategory: ['Все', Validators.required],
        carModel: ['test', Validators.required],
      }),
      additionallyFormGroup: this.formBuilder.group({
        color: ['Любой', Validators.required],
        dateFrom: ['12.12.2020 12:12', [Validators.required, dateValidator()]],
        dateTo: ['13.12.2020 12:12', [Validators.required, dateValidator()]],
        rateId: ['', Validators.required],
        isFullTank: null,
        isNeedChildChair: false,
        isRightWheel: false,
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
      .setValidators(rateControlTrigger(this.orderForm.get('additionallyFormGroup').get('rateId')));
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
