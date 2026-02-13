import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BreadcrumbService } from 'xng-breadcrumb';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';
import {
  ApiRouteFormGroupHelper,
  ApiRouteHeadersFormGroupHelper,
  ApiRouteTransformsFormGroupHelper,
} from 'src/app/core/form-groups/api-route-form-group';
import {
  ApiRoute,
  ApiRouteCommandResponse,
  ApiRouteUpsertRequest,
  HEADER_MODE_OPTIONS,
  HTTP_METHODS,
} from 'src/app/core/model/api-route.model';
import { ButtonSize, ButtonType, ToolTipText } from 'src/app/core/model/core';
import { validationMessage } from 'src/app/core/validators/validation-message';
import {
  selectApiRoute,
  selectApiRouteCommandResponse,
  selectApiRouteCreating,
  selectApiRouteUpdating,
} from 'src/app/state/api-route/api-route.selector';
import { AppState } from 'src/app/store/app.state';
import * as ApiRouteActions from 'src/app/state/api-route/api-route.action';
import * as RequestPageActions from 'src/app/state/request-page/request-page.action';
import { filter, map, Subject, switchMap, take, takeUntil } from 'rxjs';
import {
  selectApiClusters,
  selectTotalApiClusters,
} from 'src/app/state/api-cluster/api-cluster.selector';
import * as ApiClusterActions from 'src/app/state/api-cluster/api-custer.action';

@Component({
  selector: 'blogsphere-route-setup',
  templateUrl: './route-setup.component.html',
  styleUrls: ['./route-setup.component.scss'],
  animations: [fadeSlideInOut],
})
export class RouteSetupComponent implements OnInit, OnDestroy {
  public routeForm: FormGroup;
  public routeId: string = this.route.snapshot.params['id'];
  public route$ = this.store.select(selectApiRoute);
  public isAnyHeaderProvided: boolean = true;
  public isAnyTransformProvided: boolean = true;
  public httpMethods = HTTP_METHODS;
  public headerModeOptions = HEADER_MODE_OPTIONS;
  public isCreatingRoute$ = this.store.select(selectApiRouteCreating);
  public isRouteCreated$ = this.store.select(selectApiRouteCommandResponse);
  public isUpdatingRoute$ = this.store.select(selectApiRouteUpdating);
  public isRouteUpdated$ = this.store.select(selectApiRouteCommandResponse);
  public apiClusterCount = this.store.select(selectTotalApiClusters);

  public clusterIds: { id: string, name: string }[] = [];
  public isEditMode: boolean = false;
  private destroy$ = new Subject<void>();

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;
  ToolTipText = ToolTipText;

  public get headers(): FormArray {
    return this.routeForm.get('headers') as FormArray;
  }

  public get transforms(): FormArray {
    return this.routeForm.get('transforms') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private breadCrumb: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.setupClusterIdsSubscription();
    this.routeForm = ApiRouteFormGroupHelper.createApiRouteFormGroup(this.fb);

    if (this.routeId) {
      this.loadRouteForEdit();
    } else {
      this.resetFormForCreate();
    }

    this.subscribeToRouteCommandResponses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupClusterIdsSubscription(): void {
    this.store.dispatch(new ApiClusterActions.GetApiClusterCount({ isFilteredQuery: false }));

    this.apiClusterCount
      .pipe(
        filter(count => count > 0),
        take(1),
        switchMap(count => {
          this.store.dispatch(
            new ApiClusterActions.GetAllApiClusters({
              isFilteredQuery: false,
              pageIndex: 1,
              pageSize: count,
              matchPhraseField: '',
              matchPhrase: '',
              sortField: 'createdAt',
              sortOrder: 'desc',
            })
          );
          return this.store.select(selectApiClusters).pipe(
            filter(
              (clusters): clusters is NonNullable<typeof clusters> =>
                !!clusters && clusters.length === count
            ),
            take(1),
            map(clusters => clusters.map(cluster => ({ id: cluster.clusterId, name: cluster.clusterId })))
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(clusters => {
        this.clusterIds = clusters.map(cluster => ({ id: cluster.id, name: cluster.name }));
      });
  }

  private loadRouteForEdit(): void {
    this.isEditMode = true;
    this.store.dispatch(new ApiRouteActions.GetApiRouteById({ id: this.routeId }));
    this.route$.pipe(takeUntil(this.destroy$)).subscribe(route => {
      if (route) {
        this.patchRouteFormWithRoute(route);
        this.patchHeadersFromRoute(route);
        this.patchTransformsFromRoute(route);
      }
    });
  }

  private patchRouteFormWithRoute(route: ApiRoute): void {
    this.breadCrumb.set('@route-name', `Edit ${route.routeId}`);
    this.routeForm.patchValue({
      ...route,
      headers: undefined,
      transforms: undefined,
    });
  }

  private patchHeadersFromRoute(route: ApiRoute): void {
    this.headers.clear();
    (route.headers || []).forEach(() => {
      this.headers.push(ApiRouteHeadersFormGroupHelper.createRouteHeaderFormGroup(this.fb));
    });
    this.headers.patchValue(
      (route.headers || []).map(h => ({
        name: h.name,
        values: Array.isArray(h.values) ? h.values.join(', ') : h.values,
        mode: h.mode,
        isActive: h.isActive,
      }))
    );
  }

  private patchTransformsFromRoute(route: ApiRoute): void {
    this.transforms.clear();
    (route.transforms || []).forEach(() => {
      this.transforms.push(
        ApiRouteTransformsFormGroupHelper.createRouteTransformFormGroup(this.fb)
      );
    });
    this.transforms.patchValue(route.transforms || []);
  }

  private resetFormForCreate(): void {
    this.routeForm.reset();
    this.headers.clear();
    this.transforms.clear();
  }

  private subscribeToRouteCommandResponses(): void {
    this.isRouteCreated$.pipe(takeUntil(this.destroy$)).subscribe(response => {
      if (response) this.handleRouteResponse(response);
    });
    this.isRouteUpdated$.pipe(takeUntil(this.destroy$)).subscribe(response => {
      if (response) this.handleRouteResponse(response);
    });
  }

  public addHeader(): void {
    this.headers.push(ApiRouteHeadersFormGroupHelper.createRouteHeaderFormGroup(this.fb));
    this.isAnyHeaderProvided = true;
  }

  public removeHeader(index: number): void {
    this.headers.removeAt(index);
  }

  public addTransform(): void {
    this.transforms.push(ApiRouteTransformsFormGroupHelper.createRouteTransformFormGroup(this.fb));
    this.isAnyTransformProvided = true;
  }

  public removeTransform(index: number): void {
    this.transforms.removeAt(index);
  }

  public isHeaderFormValid(index: number): boolean {
    return this.headers.at(index).valid;
  }

  public isHeaderFormDirty(index: number): boolean {
    return this.headers.at(index).touched;
  }

  public isTransformFormValid(index: number): boolean {
    return this.transforms.at(index).valid;
  }

  public isTransformFormDirty(index: number): boolean {
    return this.transforms.at(index).touched;
  }

  public shouldShowHeaderFormErrors(): boolean {
    return this.headers.controls.some(header => (header.touched || header.dirty) && !header.valid);
  }

  public shouldShowTransformFormErrors(): boolean {
    return this.transforms.controls.some(
      transform => (transform.touched || transform.dirty) && !transform.valid
    );
  }

  public getErrorMessages(control: string): string {
    return validationMessage(control, this.routeForm);
  }

  public onSubmit(): void {
    if (this.markFormTouchedIfInvalid()) return;
    this.dispatchUpsertRequest(this.buildUpsertRequest());
  }

  private isFormInvalid(): boolean {
    const hasInvalidHeaders = this.headers.controls.some(c => !c.valid);
    const hasInvalidTransforms = this.transforms.controls.some(c => !c.valid);
    return this.routeForm.invalid || hasInvalidHeaders || hasInvalidTransforms;
  }

  private markFormTouchedIfInvalid(): boolean {
    if (!this.isFormInvalid()) return false;
    this.routeForm.markAllAsTouched();
    this.headers.controls.forEach(c => c.markAllAsTouched());
    this.transforms.controls.forEach(c => c.markAllAsTouched());
    this.isAnyHeaderProvided = this.headers.length > 0;
    this.isAnyTransformProvided = this.transforms.length > 0;
    return true;
  }

  private buildUpsertRequest(): ApiRouteUpsertRequest {
    const rawValue = this.routeForm.getRawValue();
    return {
      routeId: rawValue.routeId,
      path: rawValue.path,
      methods: rawValue.methods,
      isActive: rawValue.isActive,
      rateLimiterPolicy: rawValue.rateLimiterPolicy,
      clusterId: rawValue.clusterId,
      headers: (rawValue.headers || []).map(
        (h: { name: string; values: string; mode: string; isActive: boolean }) => ({
          name: h.name,
          values: (h.values || '')
            .split(',')
            .map((v: string) => v.trim())
            .filter(Boolean),
          mode: h.mode,
          isActive: h.isActive,
        })
      ),
      transforms: rawValue.transforms || [],
    };
  }

  private dispatchUpsertRequest(request: ApiRouteUpsertRequest): void {
    this.store.dispatch(
      this.isEditMode
        ? new ApiRouteActions.UpdateApiRoute({ id: this.routeId, apiRoute: request })
        : new ApiRouteActions.CreateApiRoute(request)
    );
  }

  private handleRouteResponse(response: ApiRouteCommandResponse): void {
    this.store.dispatch(
      new RequestPageActions.RequestPageSet({
        requestPage: 'apiRoute',
        heading: `Successfully ${this.isEditMode ? 'updated' : 'created'} route ${
          response.routeId
        }`,
        subHeading: `You can ${
          this.isEditMode ? 'update' : 'create'
        } more or get back to the api route page`,
        previousUrl: 'api-route',
        nextUrl: this.isEditMode ? `api-route/route-setup/${response.id}` : 'api-route/route-setup',
        nextButtonLabel: this.isEditMode ? 'Edit again' : 'Add another route',
      })
    );
    this.router.navigate(['success']);
  }
}
