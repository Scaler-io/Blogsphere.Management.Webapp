import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  selectApiProductsLoading,
  selectedApiProduct,
} from 'src/app/state/api-product/api-product.selector';
import { GetApiProductById } from 'src/app/state/api-product/api-product.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as SubscribedApiActions from 'src/app/state/subscribed-api/subscribed-api.action';
import {
  selectSubscribedApis,
  selectSubscribedApisCreateSuccess,
  selectSubscribedApisDeleteSuccess,
  selectSubscribedApisLoading,
} from 'src/app/state/subscribed-api/subscribed-api.selector';
import { SubscribedApiCreateDialogComponent } from '../subscribed-api-create-dialog/subscribed-api-create-dialog.component';
import { ResetError } from 'src/app/state/error/error.action';
import { ButtonSize, ButtonType, ItemDeleteDialogData } from 'src/app/core/model/core';
import { ItemDeleteDialogComponent } from 'src/app/shared/components/item-delete-dialog/item-delete-dialog.component';
import { SubscribedApi, Subscription } from 'src/app/core/model/subscription.model';
import { delay, of, Subject, takeUntil } from 'rxjs';
import { SubscriptionCreateDialogComponent } from '../subscription-create-dialog/subscription-create-dialog.component';
import {
  selectSubscriptions,
  selectSubscriptionsDeleteSuccess,
  selectSubscriptionsLoading,
} from 'src/app/state/subscription/subscription.selector';
import * as SubscriptionActions from 'src/app/state/subscription/subscription.action';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';

@Component({
  selector: 'blogsphere-api-product-details',
  templateUrl: './api-product-details.component.html',
  styleUrls: ['./api-product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeSlideInOut],
})
export class ApiProductDetailsComponent implements OnInit, OnDestroy {
  public apiProductId = this.route.snapshot.params['id'];
  public apiProduct$ = this.store.select(selectedApiProduct);
  public subscribedApis$ = this.store.select(selectSubscribedApis);
  public subscriptions$ = this.store.select(selectSubscriptions);

  // event states
  public isApiProductLoading$ = this.store.select(selectApiProductsLoading);
  public isSubscriptionsLoading$ = this.store.select(selectSubscriptionsLoading);
  public isSubscribedApisLoading$ = this.store.select(selectSubscribedApisLoading);
  public isSubcribedApiCreated$ = this.store.select(selectSubscribedApisCreateSuccess);
  public isSubscribedApiDeleted$ = this.store.select(selectSubscribedApisDeleteSuccess);
  public isSubscriptionCreated$ = this.store.select(selectSubscriptionsDeleteSuccess);
  public isSubscriptionDeleted$ = this.store.select(selectSubscriptionsDeleteSuccess);
  public disabledApiIds = new Set<string>();
  public disabledSubscriptionIds = new Set<string>();
  private destroy$ = new Subject<void>();

  ButtonSize = ButtonSize;
  ButtonType = ButtonType;
  expandedIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbService,
    private store: Store<AppState>,
    private zone: NgZone,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.noChangeDetection(() => {
      this.store.dispatch(new GetApiProductById({ id: this.apiProductId }));
      this.store.dispatch(
        new SubscribedApiActions.GetAllSubscribedApisByProductId({ productId: this.apiProductId })
      );
      this.store.dispatch(
        new SubscriptionActions.GetAllSubscriptionsByProductId({ productId: this.apiProductId })
      );
    });

    this.apiProduct$.pipe(takeUntil(this.destroy$)).subscribe(apiProduct => {
      if (apiProduct) {
        this.useChangeDetection(() => {
          this.breadcrumb.set('@api-product-name', apiProduct.productName);
        });
      }
    });

    this.isSubcribedApiCreated$.pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result) {
        this.useChangeDetection(() => this.snackbar.open('API created successfully', 'Close'));
      }
    });

    this.isSubscribedApiDeleted$.pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result) {
        this.useChangeDetection(() => {
          this.disabledApiIds.clear();
          this.snackbar.open('API deleted successfully', 'Close');
        });
        this.noChangeDetection(() =>
          this.store.dispatch(new SubscribedApiActions.ResetDeleteSuccess())
        );
      }
    });

    this.isSubscriptionCreated$.pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result) {
        this.useChangeDetection(() =>
          this.snackbar.open('Subscription created successfully', 'Close')
        );
      }
    });

    this.isSubscriptionDeleted$.pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result) {
        this.useChangeDetection(() => {
          this.disabledSubscriptionIds.clear();
          this.snackbar.open('Subscription deleted successfully', 'Close');
        });
        this.noChangeDetection(() => {
          this.store.dispatch(new SubscriptionActions.ResetDeleteSuccess());
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
    this.snackbar.open('Copied to clipboard', 'Close');
  }

  public trackByApiId(index: number, api: any): string {
    return api.id || index;
  }

  public isApiDisabled(apiId: string): boolean {
    return this.disabledApiIds.has(apiId);
  }

  public isSubscriptionDisabled(subscriptionId: string): boolean {
    return this.disabledSubscriptionIds.has(subscriptionId);
  }

  public openCreateSubscribedApiDialog(): void {
    this.resetActions();
    this.dialog.open(SubscribedApiCreateDialogComponent, {
      width: '500px',
      height: '550px',
      data: {
        productId: this.apiProductId,
      },
      panelClass: 'blogsphere-dialogue',
      disableClose: true,
    });
  }

  public openCreateSubscriptionDialog(): void {
    this.dialog.open(SubscriptionCreateDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        productId: this.apiProductId,
      },
      panelClass: 'blogsphere-dialogue',
      disableClose: true,
    });
  }

  public openDeleteSubscribedApiDialog(subscribedApi: SubscribedApi): void {
    const dialogData: ItemDeleteDialogData = {
      title: 'Delete ' + subscribedApi.apiName,
      message: 'Are you sure you want to delete this subscribed API?',
    };
    const dialogRef = this.dialog.open(ItemDeleteDialogComponent, {
      width: '500px',
      height: '250px',
      data: {
        dialogData: dialogData,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.useChangeDetection(() => this.disabledApiIds.add(subscribedApi.id));
        this.noChangeDetection(() =>
          this.store.dispatch(
            new SubscribedApiActions.DeleteSubscribedApi({ id: subscribedApi.id })
          )
        );
      }
    });
  }

  public openDeleteSubscriptionDialog(subscription: Subscription): void {
    const dialogData: ItemDeleteDialogData = {
      title: `Delete ${subscription.subscriptionName}`,
      message: 'Are you sure you want to delete this subscription?',
    };
    const dialogRef = this.dialog.open(ItemDeleteDialogComponent, {
      width: '500px',
      height: '250px',
      data: {
        dialogData: dialogData,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.useChangeDetection(() => this.disabledSubscriptionIds.add(subscription.id));
        this.noChangeDetection(() =>
          this.store.dispatch(
            new SubscriptionActions.DeleteSubscription({
              id: subscription.id,
              productId: this.apiProductId,
            })
          )
        );
      }
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

  private resetActions(): void {
    this.noChangeDetection(() => {
      this.store.dispatch(new ResetError());
      this.store.dispatch(new SubscribedApiActions.ResetCreateSuccess());
    });
  }
}
