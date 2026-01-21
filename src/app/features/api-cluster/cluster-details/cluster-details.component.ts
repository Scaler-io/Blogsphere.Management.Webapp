import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import {
  selectApiCluster,
  selectApiClusterCommandResponse,
  selectApiClusterDeleting,
  selectApiClusterLoading,
} from 'src/app/state/api-cluster/api-cluster.selector';
import { AppState } from 'src/app/store/app.state';
import { BreadcrumbService } from 'xng-breadcrumb';
import { InfoCardSize, InfoCardVariant } from 'src/app/shared/components/info-card';
import { ButtonType, ButtonSize, BadgeType, ItemDeleteDialogData } from 'src/app/core/model/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemDeleteDialogComponent } from 'src/app/shared/components/item-delete-dialog/item-delete-dialog.component';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import * as ApiClusterActions from 'src/app/state/api-cluster/api-custer.action';
import * as RequestPageActions from 'src/app/state/request-page/request-page.action';

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

  private clusterName: string;
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
    this.loadApiClusterDetails();

    this.clusterDetails$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this.clusterName = res.clusterId;
      }
    });

    this.isClusterDeleted$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this.handleClusterResponse();
      }
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

  public formatDate(date: string): string {
    return DateHelper.formatDateToTimeAgo(date);
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
