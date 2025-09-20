import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { SubscriptionFormGroupHelper } from 'src/app/core/form-groups/subscription-form-group';
import { ButtonSize, ButtonType } from 'src/app/core/model/core';
import { CreateApiProductRequest } from 'src/app/core/model/subscription.model';
import { validationMessage } from 'src/app/core/validators/validation-message';
import { CreateApiProduct, ResetCreateSuccess } from 'src/app/state/api-product/api-product.action';
import {
  selectApiProductsCreating,
  selectApiProductsCreateSuccess,
} from 'src/app/state/api-product/api-product.selector';
import { selectError } from 'src/app/state/error/error.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'blogsphere-api-product-create-dialog',
  templateUrl: './api-product-create-dialog.component.html',
  styleUrls: ['./api-product-create-dialog.component.scss'],
})
export class ApiProductCreateDialogComponent implements OnInit, OnDestroy {
  public apiProductFormGroup: FormGroup;
  public isCreating$ = this.store.select(selectApiProductsCreating);
  public createSuccess$ = this.store.select(selectApiProductsCreateSuccess);
  public error$ = this.store.select(selectError);
  private destroy$ = new Subject<void>();

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  constructor(
    private dialogRef: MatDialogRef<ApiProductCreateDialogComponent>,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.apiProductFormGroup = SubscriptionFormGroupHelper.createApiProductFormGroup(this.fb);

    this.createSuccess$.pipe(takeUntil(this.destroy$)).subscribe(success => {
      if (success) {
        this.store.dispatch(new ResetCreateSuccess());
        this.dialogRef.close(true);
      }
    });

    this.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      if (error) {
        this.dialogRef.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public getErrorMessage(formControlName: string): string {
    return validationMessage(formControlName, this.apiProductFormGroup);
  }

  public onCreateApiProduct(): void {
    if (this.apiProductFormGroup.invalid) {
      this.apiProductFormGroup.markAllAsTouched();
      return;
    }
    const apiProductRequest: CreateApiProductRequest = this.apiProductFormGroup.value;
    this.store.dispatch(new CreateApiProduct(apiProductRequest));
  }
}
