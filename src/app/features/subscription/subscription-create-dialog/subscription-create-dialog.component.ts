import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ButtonSize, ButtonType } from 'src/app/core/model/core';
import { selectSubscriptionsCreating } from 'src/app/state/subscription/subscription.selector';
import { AppState } from 'src/app/store/app.state';
import { Subject, takeUntil } from 'rxjs';
import { SubscriptionFormGroupHelper } from 'src/app/core/form-groups/subscription-form-group';
import { selectError } from 'src/app/state/error/error.selector';
import * as SubscriptionActions from 'src/app/state/subscription/subscription.action';
import { validationMessage } from 'src/app/core/validators/validation-message';
import { CreateSubscriptionRequest } from 'src/app/core/model/subscription.model';

@Component({
  selector: 'blogsphere-subscription-create-dialog',
  templateUrl: './subscription-create-dialog.component.html',
  styleUrls: ['./subscription-create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionCreateDialogComponent implements OnInit, OnDestroy {
  public subscriptionFormGroup: FormGroup;
  public isCreating$ = this.store.select(selectSubscriptionsCreating);
  public createSuccess$ = this.store.select(selectSubscriptionsCreating);
  public error$ = this.store.select(selectError);

  private destroy$ = new Subject<void>();

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  constructor(
    private dialogRef: MatDialogRef<SubscriptionCreateDialogComponent>,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.subscriptionFormGroup = SubscriptionFormGroupHelper.createSubscriptionFormGroup(
      this.fb,
      this.data.productId
    );

    this.createSuccess$.pipe(takeUntil(this.destroy$)).subscribe(success => {
      if (success) {
        this.store.dispatch(new SubscriptionActions.ResetCreateSuccess());
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
    return validationMessage(formControlName, this.subscriptionFormGroup);
  }

  public onCreateSubscription(): void {
    if (this.subscriptionFormGroup.invalid) {
      this.subscriptionFormGroup.markAllAsTouched();
      return;
    }
    const formValue: CreateSubscriptionRequest = this.subscriptionFormGroup.value;
    this.noChangeDetection(() => {
      this.store.dispatch(new SubscriptionActions.CreateSubscription(formValue));
    });
  }

  private noChangeDetection(fn: Function): void {
    this.zone.runOutsideAngular(() => {
      fn();
    });
  }

  private useChangeDetection(fn: Function): void {
    this.zone.run(() => {
      fn();
      this.cdr.detectChanges();
    });
  }
}
