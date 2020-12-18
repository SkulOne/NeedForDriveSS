import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ICar } from '@shared/interfaces/ICar';
import { FileInput } from 'ngx-material-file-input';
import { untilDestroyed } from 'ngx-take-until-destroy';

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
  @Input() photoAndDescriptionForm: AbstractControl | FormGroup;

  readonly carEmpty = 'assets/images/car-null.png';

  imgTypes = '.pdf, .png, .jpeg, .jpg, .bmp';
  carPhoto: string | ArrayBuffer = this.carEmpty;
  showSpinner: boolean;

  private _car;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  get car(): ICar {
    return this._car;
  }

  @Input() set car(value: ICar) {
    if (value) {
      this._car = value;
      this.carPhoto = this.car.thumbnail ? this.car.thumbnail.path : this.carEmpty;
      this.setFormValue();
      this.showSpinner = this.carPhoto !== this.carEmpty;
    }
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.photoAndDescriptionForm
      .get('photo')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.setPhoto(value);
      });
  }

  ngOnDestroy(): void {}

  deletePhoto(): void {
    this.carPhoto = this.carEmpty;
    this.photoAndDescriptionForm.get('photo').setValue(null);
    this.photoAndDescriptionForm.get('photoPath').setValue(null);
  }

  imgLoad(): void {
    this.showSpinner = false;
  }

  private setFormValue(): void {
    this.photoAndDescriptionForm.setValue({
      photo: this.car.thumbnail ? this.car.thumbnail : null,
      description: this.car.description,
      photoPath: this.car.thumbnail ? this.car.thumbnail.path : null,
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
        this.photoAndDescriptionForm.get('photoPath').setValue(reader.result);
        this.changeDetectorRef.detectChanges();
      };
    }
  }
}
