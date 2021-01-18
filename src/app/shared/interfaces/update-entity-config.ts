import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

export interface UpdateEntityConfig {
  formBuilder?: FormBuilder;
  dialog?: MatDialog;
  snackBar?: MatSnackBar;
  changeDetectorRef?: ChangeDetectorRef;
}
