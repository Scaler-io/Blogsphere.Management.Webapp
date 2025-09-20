import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getSidenavToggleState } from 'src/app/state/sidenav/sidenav.selector';
import { getMobileViewState } from 'src/app/state/mobile-view/mobile-view.selector';
import { ToggleSideNav } from 'src/app/state/sidenav/sidenav.action';

@Component({
  selector: 'blogsphere-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public isSidenavExpanded: boolean;
  public isMobileView: boolean;

  public subMenuList = {
    apiManager: false,
  };

  private subscriptions = {
    sidenavToggleState: null,
    mobileViewState: null,
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscriptions.sidenavToggleState = this.store
      .select(getSidenavToggleState)
      .subscribe((state) => {
        this.isSidenavExpanded = state;
        if (!state) {
          this.subMenuList = {
            ...this.subMenuList,
            apiManager: false,
          };
        }
      });

    this.subscriptions.mobileViewState = this.store
      .select(getMobileViewState)
      .subscribe((state) => {
        if (state) this.isMobileView = state;
      });
  }

  ngOnDestroy(): void {
    Object.values(this.subscriptions).forEach((subscription) => {
      if (subscription) subscription.unsubscribe();
    });
  }

  public handleSidenavItemClick(menu?: string) {
    if (menu) this.updateSubmenuActions(menu);
    if (!this.isMobileView && !this.isSidenavExpanded) {
      this.store.dispatch(new ToggleSideNav());
    }
  }

  public hadndleSubmenuClick() {
    if (this.isMobileView && !this.isSidenavExpanded) {
      this.store.dispatch(new ToggleSideNav());
    }
  }

  private updateSubmenuActions(menu: string): void {
    switch (menu) {
      case 'apiManager':
        this.subMenuList = {
          ...this.subMenuList,
          apiManager: !this.subMenuList.apiManager,
        };
        break;
      default:
        break;
    }
  }
}
