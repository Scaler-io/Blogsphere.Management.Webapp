import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';
import {
  selectApiCluster,
  selectApiClusterCommandResponse,
  selectApiClusterDeleting,
  selectApiClusterLoading,
} from 'src/app/state/api-cluster/api-cluster.selector';
import { AppState } from 'src/app/store/app.state';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ButtonType, ButtonSize, BadgeType, ItemDeleteDialogData } from 'src/app/core/model/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemDeleteDialogComponent } from 'src/app/shared/components/item-delete-dialog/item-delete-dialog.component';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import * as ApiClusterActions from 'src/app/state/api-cluster/api-custer.action';
import * as RequestPageActions from 'src/app/state/request-page/request-page.action';
import { ApiClusterCommandType, ClusterRouteDetails } from 'src/app/core/model/api-cluster.model';
import {
  DetailsCardTableCell,
  DetailsCardTableRow,
} from 'src/app/shared/components/details-card/details-card.model';

@Component({
  selector: 'blogsphere-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.scss'],
})
export class ClusterDetailsComponent implements OnInit, OnDestroy {
  public clusterId: string = this.route.snapshot.params['id'];
  public isClusterLoading$ = this.store.select(selectApiClusterLoading);
  public clusterDetails$ = this.store.select(selectApiCluster);
  public isClusterDeleting$ = this.store.select(selectApiClusterDeleting);
  public isClusterDeleted$ = this.store.select(selectApiClusterCommandResponse);
  public isJsonView: boolean = false;

  public destinationsTableHeaders: string[] = ['Destination id', 'Status', 'Weight', 'Address'];
  public routesTableHeaders: string[] = ['Route id', 'Status', 'Methods', 'Path'];
  public destinationsTableRows: DetailsCardTableRow[] = [];
  public routesTableRows: DetailsCardTableRow[] = [];

  private clusterName: string;
  private destroy$: Subject<void> = new Subject<void>();

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
    this.loadApiClusterDetails();

    this.clusterDetails$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this.clusterName = res.clusterId;
        this.destinationsTableRows = this.buildDestinationsTableRows(res.destinations);
        this.routesTableRows = this.buildRoutesTableRows(res.routes);
      }
    });

    this.isClusterDeleted$
      .pipe(takeUntil(this.destroy$))
      .pipe(filter(res => res && res.commandtType === ApiClusterCommandType.Delete))
      .subscribe(_ => {
        this.handleClusterResponse();
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
    this.router.navigate(['api-cluster', 'cluster-setup', this.clusterId]);
  }

  public goToRoutes(): void {
    this.router.navigate(['api-route', 'route-setup']);
  }

  public openDeleteDialog(): void {
    const dialogData: ItemDeleteDialogData = {
      title: 'Delete ' + this.clusterName,
      message: 'Are you sure you want to delete this API cluster?',
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
        this.store.dispatch(new ApiClusterActions.DeleteApiCluster({ id: this.clusterId }));
      }
    });
  }

  public formatDate(date: string | null | undefined): string {
    if (!date) return 'N/A';
    return DateHelper.formatDateToTimeAgo(date);
  }

  private buildDestinationsTableRows(
    destinations: any[] | null | undefined
  ): DetailsCardTableRow[] {
    return (destinations || []).map(d => {
      const idCell: DetailsCardTableCell = { text: d?.destinationId ?? '', variant: 'emphasis' };
      const statusCell: DetailsCardTableCell = { status: !!d?.isActive };
      const weightCell: string = 'N/A';
      const addressCell: DetailsCardTableCell = { text: d?.address ?? '', variant: 'mono' };
      return [idCell, statusCell, weightCell, addressCell];
    });
  }

  private buildRoutesTableRows(
    routes: ClusterRouteDetails[] | null | undefined
  ): DetailsCardTableRow[] {
    return (routes || []).map(r => {
      const idCell: DetailsCardTableCell = {
        text: r?.routeId ?? '',
        variant: 'emphasis',
      };
      const statusCell: DetailsCardTableCell = { status: !!r?.isActive };
      const methodsCell: DetailsCardTableCell = {
        text: (r?.methods || []).join(', '),
        variant: 'mono',
      };
      const pathCell: DetailsCardTableCell = { text: (r as any)?.path ?? 'N/A', variant: 'mono' };
      return [idCell, statusCell, methodsCell, pathCell];
    });
  }

  private loadApiClusterDetails(): void {
    if (this.clusterId) {
      this.store.dispatch(new ApiClusterActions.GetApiClusterById({ id: this.clusterId }));
      this.clusterDetails$.pipe(takeUntil(this.destroy$)).subscribe(res => {
        if (res) {
          this.breadcrumb.set('@cluster-name', `${res.clusterId}`);
        }
      });
    }
  }

  private handleClusterResponse(): void {
    this.store.dispatch(
      new RequestPageActions.RequestPageSet({
        requestPage: 'apiCluster',
        heading: `Successfully deleted cluster ${this.clusterName}`,
        subHeading: `The cluster has been successfully deleted. Continue managing your API clusters below.`,
        nextUrl: 'api-cluster',
        nextButtonLabel: 'Manage clusters',
      })
    );
    this.router.navigate(['success']);
  }
}
