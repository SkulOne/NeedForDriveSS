import { Component, OnDestroy, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { OrderService } from '@shared/services/order.service';
import { dateValidator, isAfterDate, rateControlTrigger, validPrice } from '@shared/validators';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Order } from '@shared/interfaces/order';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  @Output() isReady = new EventEmitter<boolean>();
  order: Order;
  @ViewChild('stepper') private stepper: MatStepper;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private errorService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.initForms();

    this.orderService.orderTrigger(null);
    this.orderService.stepperIndex = 0;
    this.orderService.nextStepBtnTrigger.next();

    this.orderService.nextStepBtnTrigger.subscribe(() => {
      this.goToStep(this.orderService.stepperIndex + 1);
    });

    this.orderService.order.pipe(untilDestroyed(this)).subscribe((value) => {
      this.order = { ...value };
    });
  }

  isPrevLast(event: StepperSelectionEvent): void {
    if (this.stepper.steps.length === event.selectedIndex + 1) {
      this.isReady.emit(true);
    } else {
      this.isReady.emit(false);
    }
  }

  ngOnDestroy(): void {}

  private initForms(): void {
    this.orderForm = this.formBuilder.group({
      locationFormGroup: this.formBuilder.group({
        city: [null, Validators.required],
        pickupPoint: [null, Validators.required],
      }),
      carModelFormGroup: this.formBuilder.group({
        carModel: [null, Validators.required],
      }),
      additionallyFormGroup: this.formBuilder.group({
        dateFrom: [null, Validators.required],
        dateTo: [null, Validators.required],
        rateId: [null, Validators.required],
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
        Validators.required,
      ]);
    this.orderForm
      .get('additionallyFormGroup')
      .get('dateTo')
      .setValidators([
        isAfterDate(this.orderForm.get('additionallyFormGroup').get('dateFrom')),
        dateValidator(),
        Validators.required,
      ]);
    this.orderForm
      .get('additionallyFormGroup')
      .get('rateId')
      .setValidators([
        validPrice(
          this.orderForm.get('additionallyFormGroup').get('dateFrom'),
          this.orderForm.get('additionallyFormGroup').get('dateTo'),
          this.errorService
        ),
        Validators.required,
      ]);
  }
}
