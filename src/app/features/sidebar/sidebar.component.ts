import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppPermission } from 'src/app/core/auth/permissions.constants';
import { AppState } from 'src/app/store/app.state';
import { selectHasPermission } from 'src/app/state/auth/auth.selector';
import { getSidenavToggleState } from 'src/app/state/sidenav/sidenav.selector';
import { selectMobileViewState } from 'src/app/state/mobile-view/mobile-view.selector';
import { ToggleSideNav } from 'src/app/state/sidenav/sidenav.action';
import { SidebarSubmenuItem } from './sidebar-expandable-nav-item/sidebar-expandable-nav-item.component';

@Component({
  selector: 'blogsphere-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent implements OnInit, OnDestroy {
  public isSidenavExpanded: boolean;
  public isMobileView: boolean;
  public canAccessSystemSettings$: Observable<boolean> = this.store.select(
    selectHasPermission(AppPermission.SYSTEM_VIEW_SETTINGS)
  );
  public canAccessUserManagement$: Observable<boolean> = this.store.select(
    selectHasPermission(AppPermission.USER_VIEW)
  );

  public subMenuList = {
    apiManager: false,
    userManagement: false,
  };

  public readonly apiManagerSubmenuItems: SidebarSubmenuItem[] = [
    { routerLink: '/api-cluster', icon: 'hub', label: 'Api clusters' },
    { routerLink: '/api-route', icon: 'route', label: 'Api routes' },
  ];
  public readonly userManagementSubmenuItems: SidebarSubmenuItem[] = [
    { routerLink: '/user-manager/app-users', icon: 'person', label: 'App users' },
    { routerLink: '/user-manager/management-users', icon: 'admin_panel_settings', label: 'Management users' },
  ];

  private subscriptions = {
    sidenavToggleState: null,
    mobileViewState: null,
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscriptions.sidenavToggleState = this.store
      .select(getSidenavToggleState)
      .subscribe(state => {
        this.isSidenavExpanded = state;
        if (!state) {
          this.subMenuList = {
            ...this.subMenuList,
            apiManager: false,
            userManagement: false,
          };
        }
      });

    this.subscriptions.mobileViewState = this.store
      .select(selectMobileViewState)
      .subscribe(state => {
        if (state) {
          this.isMobileView = state;
          this.store.dispatch(new ToggleSideNav());
        }
      });
  }

  ngOnDestroy(): void {
    Object.values(this.subscriptions).forEach(subscription => {
      if (subscription) subscription.unsubscribe();
    });
  }

  public handleSidenavItemClick(menu?: string) {
    if (menu) this.updateSubmenuActions(menu);
    if (this.isMobileView && this.isSidenavExpanded && !menu) {
      this.store.dispatch(new ToggleSideNav());
    }
    if (!this.isMobileView && !this.isSidenavExpanded) {
      this.store.dispatch(new ToggleSideNav());
    }
  }

  public hadndleSubmenuClick() {
    if (this.isMobileView) {
      this.store.dispatch(new ToggleSideNav());
    }
  }

  public handleBackdropClick() {
    if (this.isMobileView && this.isSidenavExpanded) {
      this.store.dispatch(new ToggleSideNav());
    }
  }

  private updateSubmenuActions(menu: string): void {
    switch (menu) {
      case 'apiManager':
        this.subMenuList = {
          ...this.subMenuList,
          apiManager: !this.subMenuList.apiManager,
          userManagement: false,
        };
        break;
      case 'userManagement':
        this.subMenuList = {
          ...this.subMenuList,
          userManagement: !this.subMenuList.userManagement,
          apiManager: false,
        };
        break;
      default:
        break;
    }
  }
}
