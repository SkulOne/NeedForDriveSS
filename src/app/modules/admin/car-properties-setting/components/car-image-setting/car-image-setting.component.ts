import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Car } from '@shared/classes/car';
import { CarPhoto } from '@shared/interfaces/car-photo';

@Component({
  selector: 'app-car-image-setting',
  templateUrl: './car-image-setting.component.html',
  styleUrls: ['./car-image-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarImageSettingComponent implements OnInit, OnDestroy {
  @Input() progressValue: number;
  @Input() name: string;
  @Input() type: string;
  @Input() form: FormGroup;

  readonly carEmpty = 'assets/images/car-null.png';

  imgTypes = '.pdf, .png, .jpeg, .jpg, .bmp';
  carPhoto: string | ArrayBuffer = this.carEmpty;
  showSpinner: boolean;
  namePhoto: string;

  private _car;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  get car(): Car {
    return this._car;
  }

  @Input() set car(value: Car) {
    if (value) {
      this._car = value;
      this.carPhoto = this.car.thumbnail ? this.car.thumbnail.path : this.carEmpty;
      this.setFormValue();
      this.showSpinner = this.carPhoto !== this.carEmpty;
    }
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.form.addControl('description', new FormControl());
    this.form.addControl('thumbnail', new FormControl());
    this.form
      .get('thumbnail')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.setPhoto(value);
      });
  }

  ngOnDestroy(): void {}

  deletePhoto(): void {
    this.carPhoto = this.carEmpty;
    this.form.get('thumbnail').setValue(null);
  }

  imgLoad(): void {
    this.showSpinner = false;
  }

  private setFormValue(): void {
    this.form.setValue({
      photo: this.car.thumbnail ? this.car.thumbnail : null,
      description: this.car.description,
    });
  }

  private setPhoto(inputValue: FileInput): void {
    if (inputValue instanceof FileInput) {
      this.showSpinner = true;
      const file = inputValue.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.showSpinner = false;
        this.carPhoto = reader.result;
        const photo = inputValue.files[0];
        this.form.get('thumbnail').setValue({
          path: this.carPhoto,
          size: photo.size,
          mimetype: photo.type,
          originalname: photo.name,
        } as CarPhoto);
        this.namePhoto = photo.name;
        this.changeDetectorRef.detectChanges();
      };
    }
  }
}
