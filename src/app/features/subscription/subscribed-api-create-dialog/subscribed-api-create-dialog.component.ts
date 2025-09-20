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
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { ButtonType } from 'src/app/core/model/core';
import { ButtonSize } from 'src/app/core/model/core';
import { Subject, takeUntil } from 'rxjs';
import {
  selectSubscribedApisCreateSuccess,
  selectSubscribedApisCreating,
} from 'src/app/state/subscribed-api/subscribed-api.selector';
import { selectError } from 'src/app/state/error/error.selector';
import { SubscriptionFormGroupHelper } from 'src/app/core/form-groups/subscription-form-group';
import { validationMessage } from 'src/app/core/validators/validation-message';
import { CreateSubscribedApiRequest } from 'src/app/core/model/subscription.model';
import * as SubscribedApiActions from 'src/app/state/subscribed-api/subscribed-api.action';

@Component({
  selector: 'blogsphere-subscribed-api-create-dialog',
  templateUrl: './subscribed-api-create-dialog.component.html',
  styleUrls: ['./subscribed-api-create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribedApiCreateDialogComponent implements OnInit, OnDestroy {
  public subscribedApiFormGroup: FormGroup;
  private destroy$ = new Subject<void>();
  public isCreating$ = this.store.select(selectSubscribedApisCreating);
  public createSuccess$ = this.store.select(selectSubscribedApisCreateSuccess);
  public error$ = this.store.select(selectError);

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  constructor(
    private dialogRef: MatDialogRef<SubscribedApiCreateDialogComponent>,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.subscribedApiFormGroup = SubscriptionFormGroupHelper.createSubscribedApiFormGroup(
      this.fb,
      this.data.productId
    );

    this.createSuccess$.pipe(takeUntil(this.destroy$)).subscribe(success => {
      if (success) {
        this.store.dispatch(new SubscribedApiActions.ResetCreateSuccess());
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
    return validationMessage(formControlName, this.subscribedApiFormGroup);
  }

  public onCreateSubscribedApi(): void {
    if (this.subscribedApiFormGroup.invalid) {
      this.subscribedApiFormGroup.markAllAsTouched();
      return;
    }
    const formValue: CreateSubscribedApiRequest = this.subscribedApiFormGroup.value;
    this.noChangeDetection(() => {
      this.store.dispatch(new SubscribedApiActions.CreateSubscribedApi(formValue));
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
