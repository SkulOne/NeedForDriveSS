import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { carProperties } from './properties-inputs';
import { ICar, CategoryId } from '@shared/interfaces/ICar';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpBackService } from '@shared/services/http-back.service';
import { inputs } from '../../entity-page/inputs';

@Component({
  selector: 'app-car-properties-setting',
  templateUrl: './car-properties-setting.component.html',
  styleUrls: ['./car-properties-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarPropertiesSettingComponent implements OnInit, OnDestroy {
  @Input() carPropertiesForm: FormGroup | AbstractControl;
  @Output() save = new EventEmitter();
  @Output() create = new EventEmitter();

  inputs = inputs;

  carPropertiesInputs = carProperties;
  colors: string[];
  colorControl = this.formBuilder.control(null);
  categories: CategoryId[];

  private _car;
  private updateFormValueTrigger$ = new Subject<void>();
  private updateFormValue$ = this.updateFormValueTrigger$.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpBack: HttpBackService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  get car(): ICar {
    return this._car;
  }

  @Input() set car(value: ICar) {
    if (value) {
      this._car = value;
      this.updateFormValueTrigger$.next();
      this.setColors();
    }
  }

  ngOnInit(): void {
    this.updateFormValue$
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.getCategories())
      )
      .subscribe((categories) => {
        this.categories = categories;
        this.setFormValue();
        this.changeDetectorRef.detectChanges();
      });
  }

  deleteColor(color: string): void {
    const index = this.colors.indexOf(color);
    if (index > -1) {
      this.colors.splice(index, 1);
    }
    if (this.colors.length) {
      this.carPropertiesForm.get('colors').setValue(false);
    }
  }

  addColor(): void {
    const color = this.colorControl.value;
    if (color) {
      this.colors.push(color);
    }
    this.carPropertiesForm.get('colors').setValue(this.colors);
    this.colorControl.setValue('');
  }

  selectCar(): void {
    this.router.navigate(['/admin/carList']);
    localStorage.removeItem('carId');
  }

  createCar(): void {
    this.create.emit();
  }

  saveEmit(): void {
    this.save.emit();
  }

  ngOnDestroy(): void {}

  private setColors(): void {
    this.colors = this.car.colors ? this.car.colors : [];
  }

  private setFormValue(): void {
    let category = null;
    if (this.car.categoryId) {
      category = this.categories.filter((item) => item.id === this.car.categoryId.id)[0];
    }
    this.carPropertiesForm.setValue({
      name: this.car.name,
      colors: this.car.colors,
      type: category,
      number: this.car.number ? this.car.number : null,
      tank: this.car.tank ? this.car.tank : null,
      priceMin: this.car.priceMin,
      priceMax: this.car.priceMax,
    });
  }

  private getCategories(): Observable<CategoryId[]> {
    return this.httpBack.getAll('category');
  }
}
