import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { GetAllApiProducts, ResetCreateSuccess } from 'src/app/state/api-product/api-product.action';
import {
  selectApiProducts,
  selectApiProductsLoading,
  selectApiProductsPaginationMetaData,
  selectApiProductsTotalCount,
} from 'src/app/state/api-product/api-product.selector';
import { BadgeType, ButtonSize, ButtonType } from 'src/app/core/model/core';
import { ApiProductCreateDialogComponent } from './api-product-create-dialog/api-product-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ResetError } from 'src/app/state/error/error.action';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnMap, TableDataSource } from 'src/app/core/model/table-source';
import { ApiProduct } from 'src/app/core/model/subscription.model';
import { Subject, takeUntil } from 'rxjs';

type ApiProductRow = ApiProduct & { statusLabel: string };

@Component({
  selector: 'blogsphere-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  public apiProducts$ = this.store.select(selectApiProducts);
  public paginationMeta$ = this.store.select(selectApiProductsPaginationMetaData);
  public totalCount$ = this.store.select(selectApiProductsTotalCount);
  public isLoading$ = this.store.select(selectApiProductsLoading);

  public apiProductDataSource = new MatTableDataSource<ApiProductRow>([]);
  public displayedColumns: string[] = [
    'productName',
    'productDescription',
    'isActive',
    'subscribedApiCount',
    'subscriptionCount',
  ];
  public columnNameMap: TableColumnMap = {
    productName: { value: 'productName', isDateField: false, isStatusField: false },
    productDescription: { value: 'productDescription', isDateField: false, isStatusField: false },
    isActive: { value: 'statusLabel', isDateField: false, isStatusField: true },
    subscribedApiCount: { value: 'subscribedApiCount', isDateField: false, isStatusField: false },
    subscriptionCount: { value: 'subscriptionCount', isDateField: false, isStatusField: false },
  };

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;
  BadgeType = BadgeType;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.noChangeDetection(() => {
      this.store.dispatch(new GetAllApiProducts());
    });

    this.apiProducts$.pipe(takeUntil(this.destroy$)).subscribe(products => {
      if (products) {
        this.apiProductDataSource.data = products.map(p => ({
          ...p,
          statusLabel: p.isActive ? 'Active' : 'Inactive',
        }));
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openCreateApiProductDialog(): void {
    this.noChangeDetection(() => {
      this.store.dispatch(new ResetError());
      this.store.dispatch(new ResetCreateSuccess());
    });

    this.dialog.open(ApiProductCreateDialogComponent, {
      width: '500px',
      height: '500px',
      panelClass: 'blogsphere-dialogue',
      disableClose: true,
    });
  }

  public onPageChange(page: number): void {
    this.noChangeDetection(() => {
      this.store.dispatch(new GetAllApiProducts({ pageNumber: page }));
    });
  }

  public onViewProduct(row: TableDataSource): void {
    const product = row as ApiProductRow;
    this.navigateToApiProductDetails(product.productId);
  }

  public navigateToApiProductDetails(productId: string): void {
    this.router.navigate(['/subscription', productId]);
  }

  private noChangeDetection(fn: Function): void {
    this.zone.runOutsideAngular(() => {
      fn();
    });
  }
}
