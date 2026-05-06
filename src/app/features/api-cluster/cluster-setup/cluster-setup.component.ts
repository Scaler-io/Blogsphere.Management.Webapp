import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';
import {
  ApiClusterDestinationsFormGroupHelper,
  ApiClusterFormGroupHelper,
} from 'src/app/core/form-groups/api-cluster-form-group';
import {
  ApiClusterCommandResponse,
  ApiClusterUpsertRequest,
  LoadBalancerPolicy,
  LoadBalancerPolicySelectLabel,
} from 'src/app/core/model/api-cluster.model';
import { ButtonSize, ButtonType, ToolTipText } from 'src/app/core/model/core';
import { validationMessage } from 'src/app/core/validators/validation-message';
import {
  selectApiCluster,
  selectApiClusterCommandResponse,
  selectApiClusterCreating,
  selectApiClusterUpdating,
} from 'src/app/state/api-cluster/api-cluster.selector';
import { AppState } from 'src/app/store/app.state';
import * as ApiClusterActions from 'src/app/state/api-cluster/api-custer.action';
import * as RequestPageActions from 'src/app/state/request-page/request-page.action';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
    selector: 'blogsphere-cluster-setup',
    templateUrl: './cluster-setup.component.html',
    styleUrls: ['./cluster-setup.component.scss'],
    animations: [fadeSlideInOut],
    standalone: false
})
export class ClusterSetupComponent implements OnInit, OnDestroy {
  public clusterForm: UntypedFormGroup;
  public clusterId: string = this.route.snapshot.params['id'];
  public cluster$ = this.store.select(selectApiCluster);
  public isAnyDestinationProvided: boolean = true;
  public get destinations(): UntypedFormArray {
    return this.clusterForm.get('destinations') as UntypedFormArray;
  }
  public loadBalancerPolicyOptions: LoadBalancerPolicy[] = Object.values(LoadBalancerPolicy);
  public isCreatingCluster$ = this.store.select(selectApiClusterCreating);
  public isClusterCreated$ = this.store.select(selectApiClusterCommandResponse);
  public isUpdatingCluster$ = this.store.select(selectApiClusterUpdating);
  public isClusterUpdated$ = this.store.select(selectApiClusterCommandResponse);
  public isEditMode: boolean = false;
  private destroy$ = new Subject<void>();

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;
  ToolTipText = ToolTipText;

  public loadBalancerLabel(option: LoadBalancerPolicy): string {
    return LoadBalancerPolicySelectLabel[option];
  }

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private breadCrumb: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.clusterForm = ApiClusterFormGroupHelper.createApiClusterFormGroup(this.fb);

    if (this.clusterId) {
      this.isEditMode = true;
      this.store.dispatch(new ApiClusterActions.GetApiClusterById({ id: this.clusterId }));
      this.cluster$.pipe(takeUntil(this.destroy$)).subscribe(res => {
        if (res) {
          this.breadCrumb.set('@cluster-name', `${res.clusterId}`);
          this.clusterForm.patchValue(res);

          this.destinations.clear();
          res.destinations.forEach(() => {
            this.destinations.push(
              ApiClusterDestinationsFormGroupHelper.createApiClusterDestinationsFormGroup(this.fb)
            );
          });

          this.destinations.patchValue(
            res.destinations.map(destination => ({
              destinationId: destination.destinationId,
              address: destination.address,
              isActive: destination.isActive,
            }))
          );

          console.log(this.clusterForm.getRawValue());
        }
      });
    } else {
      this.clusterForm.reset();
      this.destinations.clear();
    }

    this.isClusterCreated$.pipe(takeUntil(this.destroy$)).subscribe(response => {
      if (response) {
        this.handleClusterResponse(response);
      }
    });

    this.isClusterUpdated$.pipe(takeUntil(this.destroy$)).subscribe(response => {
      if (response) {
        this.handleClusterResponse(response);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addDestination(): void {
    this.destinations.push(
      ApiClusterDestinationsFormGroupHelper.createApiClusterDestinationsFormGroup(this.fb)
    );
    this.isAnyDestinationProvided = true;
  }

  public removeDestination(index: number): void {
    this.destinations.removeAt(index);
  }

  public isDestinationFormValid(index: number): boolean {
    return this.destinations.at(index).valid;
  }

  public isDestinationFormDirty(index: number): boolean {
    return this.destinations.at(index).touched;
  }

  public shouldShowDestinationFormErrors(): boolean {
    return this.destinations.controls.some(
      destination => (destination.touched || destination.dirty) && !destination.valid
    );
  }

  public getErrorMessages(control: string): string {
    return validationMessage(control, this.clusterForm);
  }

  public onSubmit(): void {
    if (this.clusterForm.invalid || this.destinations.controls.length === 0) {
      this.clusterForm.markAllAsTouched();
      this.isAnyDestinationProvided = false;
    } else {
      const request: ApiClusterUpsertRequest = this.clusterForm.getRawValue();
      this.store.dispatch(
        this.isEditMode
          ? new ApiClusterActions.UpdateApiCluster({ id: this.clusterId, apiCluster: request })
          : new ApiClusterActions.CreateApiCluster(request)
      );
    }
  }

  private handleClusterResponse(response: ApiClusterCommandResponse): void {
    this.store.dispatch(
      new RequestPageActions.RequestPageSet({
        requestPage: 'apiCluster',
        heading: `Successfully ${this.isEditMode ? 'updated' : 'created'} cluster ${
          response.clusterId
        }`,
        subHeading: `You can ${
          this.isEditMode ? 'update' : 'create'
        } more or get back to the api cluster page`,
        previousUrl: 'api-cluster',
        nextUrl: this.isEditMode
          ? `api-cluster/cluster-setup/${response.id}`
          : 'api-cluster/cluster-setup',
        nextButtonLabel: this.isEditMode ? 'Edit again' : 'Add another cluster',
      })
    );
    this.router.navigate(['success']);
  }
}
