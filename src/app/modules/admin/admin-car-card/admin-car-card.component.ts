import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '@shared/services/car.service';
import { ICar, CarPhoto } from '@shared/interfaces/ICar';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { numericValidator, oneValue } from '@shared/validators';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { Car } from '@shared/classes/car';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared-module/components/confrim-dialog/confirm-dialog.component';
import { FileInput } from 'ngx-material-file-input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-car-card',
  templateUrl: './admin-car-card.component.html',
  styleUrls: ['./admin-car-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCarCardComponent implements OnInit, OnDestroy {
  car: ICar;
  showSpinner: boolean;
  carForm: FormGroup;
  progressValue = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCar();
    this.carForm.valueChanges
      .pipe(
        map((changedValues) => {
          let result = [];
          this.getArrayOfValues(changedValues).forEach((value) => {
            result = result.concat(this.getArrayOfValues(value));
          });
          return result;
        })
      )
      .subscribe((changedValue) => {
        const length = changedValue.length;
        const valuesLength = changedValue.filter((value) => value).length;
        this.progressValue = (valuesLength / length) * 100;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {}

  saveCar(): void {
    if (this.carForm.valid) {
      const propertiesForm = this.carForm.get('properties').value;
      const photoAndDescriptionForm = this.carForm.get('photoAndDescription').value;
      this.car = new Car(
        this.car.id,
        propertiesForm.name,
        propertiesForm.type,
        propertiesForm.number,
        photoAndDescriptionForm.description,
        propertiesForm.priceMin,
        propertiesForm.priceMax,
        propertiesForm.tank,
        propertiesForm.colors,
        this.parsePhoto()
      );
      this.showConfirmDialog();
    } else {
      this.errorHandler.userError('Форма содержит ошибки. Исправьте значения и попробуйте снова');
    }
  }

  createCar(): void {
    this.car = new Car();
  }

  private showConfirmDialog(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Вы уверены что хотите добавить автомобиль?',
        },
      })
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        switchMap((isConfirmed) => {
          if (isConfirmed) {
            return this.car.id ? this.carService.put(this.car) : this.carService.post(this.car);
          }
          return of(null);
        })
      )
      .subscribe(() => {
        this.router.navigate(['/admin/carList']);
        localStorage.removeItem('carId');
        this.snackBar.open('Машина успешно сохранена!', 'Ok!', {
          duration: 750,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
  }

  private getCar(): void {
    const carId = this.getCarId();
    localStorage.setItem('carId', carId);
    if (carId && carId !== 'null') {
      this.showSpinner = true;
      this.carService
        .get(carId)
        .pipe(untilDestroyed(this))
        .subscribe((car) => {
          this.car = car;
          this.showSpinner = false;
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  private getCarId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : localStorage.getItem('carId');
  }

  private initForm(): void {
    // todo Мб тут стоит задавать значение и передавать в child components?
    this.carForm = this.formBuilder.group({
      photoAndDescription: this.formBuilder.group({
        photo: null,
        description: null,
        photoPath: [null, Validators.required],
      }),
      properties: this.formBuilder.group({
        name: [null, Validators.required],
        type: [null, Validators.required],
        colors: null,
        number: null,
        priceMin: [null, [Validators.required, oneValue(), numericValidator()]],
        priceMax: [null, [Validators.required, oneValue(), numericValidator()]],
        tank: [null, [oneValue(), numericValidator()]],
      }),
    });
  }

  private parsePhoto(): CarPhoto {
    if (this.carForm.get('photoAndDescription').get('photo').value instanceof FileInput) {
      const file = this.carForm.get('photoAndDescription').get('photo').value.files[0];
      const photo = this.carForm.get('photoAndDescription').get('photoPath').value;
      return {
        mimetype: file.type,
        originalname: file.name,
        path: photo,
        size: file.size,
      };
    }
    return this.car.thumbnail;
  }

  private getArrayOfValues(object: unknown): unknown[] {
    if (typeof object === 'object') {
      const keys = Object.getOwnPropertyNames(object);
      return keys.map((key) => {
        return object[key];
      });
    }
  }
}
