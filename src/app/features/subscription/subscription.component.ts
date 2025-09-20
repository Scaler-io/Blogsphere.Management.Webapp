import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { GetAllApiProducts, ResetCreateSuccess } from 'src/app/state/api-product/api-product.action';
import { selectApiProducts, selectApiProductsPageMetadata, selectApiProductsLoading } from 'src/app/state/api-product/api-product.selector';
import { BadgeType, ButtonSize, ButtonType } from 'src/app/core/model/core';
import { ApiProductCreateDialogComponent } from './api-product-create-dialog/api-product-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ResetError } from 'src/app/state/error/error.action';
import { Router } from '@angular/router';

@Component({
  selector: 'blogsphere-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionComponent implements OnInit {
  public apiProducts$ = this.store.select(selectApiProducts);
  public apiProductsPageMetadata$ = this.store.select(
    selectApiProductsPageMetadata
  );
  public isLoading$ = this.store.select(selectApiProductsLoading);

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;
  BadgeType = BadgeType;

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
      const payload = {
        pageNumber: page,
      };
      this.store.dispatch(new GetAllApiProducts(payload));
    });
  }
  public navigateToApiProductDetails(productId: string): void {
    this.router.navigate(['/subscription', productId]);
  }

  private noChangeDetection(fn: Function): void {
    this.zone.runOutsideAngular(() => {
      fn();
    });
  }

  private useChangeDetection(fn: Function): void {
    this.zone.run(() => {
      fn();
      this.cdr.markForCheck();
    });
  }
}
