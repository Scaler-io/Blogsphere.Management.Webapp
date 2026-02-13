import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';
import {
  selectApiRoute,
  selectApiRouteCommandResponse,
  selectApiRouteDeleting,
  selectApiRouteLoading,
} from 'src/app/state/api-route/api-route.selector';
import { AppState } from 'src/app/store/app.state';
import { BreadcrumbService } from 'xng-breadcrumb';
import { InfoCardSize, InfoCardVariant } from 'src/app/shared/components/info-card';
import { BadgeType, ButtonSize, ButtonType, ItemDeleteDialogData } from 'src/app/core/model/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemDeleteDialogComponent } from 'src/app/shared/components/item-delete-dialog/item-delete-dialog.component';
import * as ApiRouteActions from 'src/app/state/api-route/api-route.action';
import * as RequestPageActions from 'src/app/state/request-page/request-page.action';
import { ApiRouteCommandType } from 'src/app/core/model/api-route.model';
import { DetailsCardTableCell, DetailsCardTableRow } from 'src/app/shared/components/details-card/details-card.model';

@Component({
  selector: 'blogsphere-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss'],
})
export class RouteDetailsComponent implements OnInit, OnDestroy {
  public apiRouteId: string = this.route.snapshot.params['id'];
  public isRouteLoading$ = this.store.select(selectApiRouteLoading);
  public routeDetails$ = this.store.select(selectApiRoute);
  public isRouteDeleting$ = this.store.select(selectApiRouteDeleting);
  public routeCommandResponse$ = this.store.select(selectApiRouteCommandResponse);
  public isJsonView: boolean = false;

  public headersTableHeaders: string[] = ['Name', 'Mode', 'Values', 'Status'];
  public transformsTableHeaders: string[] = ['Path pattern', 'Status'];
  public headersTableRows: DetailsCardTableRow[] = [];
  public transformsTableRows: DetailsCardTableRow[] = [];

  private routeName: string;
  private destroy$: Subject<void> = new Subject<void>();

  InfoCardVariant = InfoCardVariant;
  InfoCardSize = InfoCardSize;
  ButtonType = ButtonType;
  ButtonSize = ButtonSize;
  BadgeType = BadgeType;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private breadcrumb: BreadcrumbService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadApiRouteDetails();

    this.routeDetails$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this.routeName = res.routeId;
        this.headersTableRows = this.buildHeadersTableRows(res.headers);
        this.transformsTableRows = this.buildTransformsTableRows(res.transforms);
      }
    });

    this.routeCommandResponse$
      .pipe(takeUntil(this.destroy$))
      .pipe(filter(res => res && res.commandtType === ApiRouteCommandType.Delete))
      .subscribe(_ => {
        this.handleRouteResponse();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toggleJsonView(): void {
    this.isJsonView = !this.isJsonView;
  }

  public goToEdit(): void {
    this.router.navigate(['api-route', 'route-setup', this.apiRouteId]);
  }

  public openDeleteDialog(): void {
    const dialogData: ItemDeleteDialogData = {
      title: 'Delete ' + this.routeName,
      message: 'Are you sure you want to delete this API route?',
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
        this.store.dispatch(new ApiRouteActions.DeleteApiRoute({ id: this.apiRouteId }));
      }
    });
  }

  private loadApiRouteDetails(): void {
    if (this.apiRouteId) {
      this.store.dispatch(new ApiRouteActions.GetApiRouteById({ id: this.apiRouteId }));
      this.routeDetails$.pipe(takeUntil(this.destroy$)).subscribe(res => {
        if (res) {
          this.breadcrumb.set('@route-name', `${res.routeId}`);
        }
      });
    }
  }

  private handleRouteResponse(): void {
    this.store.dispatch(
      new RequestPageActions.RequestPageSet({
        requestPage: 'apiRoute',
        heading: `Successfully deleted route ${this.routeName}`,
        subHeading: `The route has been successfully deleted. Continue managing your API routes below.`,
        nextUrl: 'api-route',
        nextButtonLabel: 'Manage routes',
      })
    );
    this.router.navigate(['success']);
  }

  private buildHeadersTableRows(headers: any[] | null | undefined): DetailsCardTableRow[] {
    return (headers || []).map(h => {
      const nameCell: DetailsCardTableCell = { text: h?.name ?? '', variant: 'emphasis' };
      const modeCell: DetailsCardTableCell = { text: h?.mode ?? '', variant: 'chip' };
      const valuesCell: DetailsCardTableCell = { text: (h?.values || []).join(', '), variant: 'mono' };
      const statusCell: DetailsCardTableCell = { status: !!h?.isActive, align: 'center' };
      return [nameCell, modeCell, valuesCell, statusCell];
    });
  }

  private buildTransformsTableRows(transforms: any[] | null | undefined): DetailsCardTableRow[] {
    return (transforms || []).map(t => {
      const pathCell: DetailsCardTableCell = { text: t?.pathPattern ?? '', variant: 'mono' };
      const statusCell: DetailsCardTableCell = { status: !!t?.isActive, align: 'center' };
      return [pathCell, statusCell];
    });
  }
}
