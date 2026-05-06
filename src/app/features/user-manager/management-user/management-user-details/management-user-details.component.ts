import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ManagementUser } from 'src/app/core/model/user-manager.model';
import { BadgeType, ButtonSize, ButtonType } from 'src/app/core/model/core';
import { selectManagementUserEntity, selectManagementUserLoading } from 'src/app/state/user-manager/user-manager.selector';
import { AppState } from 'src/app/store/app.state';
import { BreadcrumbService } from 'xng-breadcrumb';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import * as userManagerActions from 'src/app/state/user-manager/user-manager.action';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';

@Component({
  selector: 'blogsphere-management-user-details',
  templateUrl: './management-user-details.component.html',
  styleUrl: './management-user-details.component.scss',
  animations: [fadeSlideInOut],
  standalone: false,
})
export class ManagementUserDetailsComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  private route = inject(ActivatedRoute);
  private breadcrumb = inject(BreadcrumbService);
  private managementUserId: string = this.route.snapshot.params['id'];
  private destroy$: Subject<void> = new Subject<void>();

  public managementUser$: Observable<ManagementUser> = this.store.select(selectManagementUserEntity);
  public isManagementUserLoading$: Observable<boolean> = this.store.select(selectManagementUserLoading);
  public isJsonView: boolean = false;

  BadgeType = BadgeType;
  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  ngOnInit(): void {
    this.loadManagementUserDetails();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toggleJsonView(): void {
    this.isJsonView = !this.isJsonView;
  }

  public formatDate(date: string | Date | null | undefined): string {
    if (!date) return 'N/A';
    return DateHelper.formatDateToTimeAgo(String(date));
  }

  public groupPermissions(perms: string[] | null | undefined): { category: string; items: string[] }[] {
    if (!perms?.length) return [];
    const buckets = new Map<string, string[]>();
    for (const perm of perms) {
      const separatorIndex = Math.max(perm.indexOf(':'), perm.indexOf('.'));
      const category = separatorIndex > 0 ? perm.substring(0, separatorIndex) : 'general';
      const list = buckets.get(category) ?? [];
      list.push(perm);
      buckets.set(category, list);
    }
    
    return Array.from(buckets.entries())
      .map(([category, items]) => ({ category, items: [...items].sort() }))
      .sort((a, b) => a.category.localeCompare(b.category));
  }

  private loadManagementUserDetails(): void {
    if (this.managementUserId) {
      this.store.dispatch(new userManagerActions.GetManagementUser({ id: this.managementUserId }));
      this.managementUser$.pipe(takeUntil(this.destroy$)).subscribe(res => {
        if (res) {
          this.breadcrumb.set('@mgmt-user-name', `${res.fullName}`);
        }
      });
    }
  }
}
