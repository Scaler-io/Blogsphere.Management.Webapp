import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { selectMobileViewState } from 'src/app/state/mobile-view/mobile-view.selector';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ToggleSideNav } from 'src/app/state/sidenav/sidenav.action';
import { AuthService } from 'src/app/core/auth/auth.service';
import { getAuthState } from 'src/app/state/auth/auth.selector';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'blogsphere-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;

  @Input() public isProfilePage: boolean = false;

  public isMobileView$ = this.store.select(selectMobileViewState);
  public authUser$ = this.store.select(getAuthState);
  public maintenanceMode: boolean = environment.maintenanceMode;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public toggleAccordion(): void {
    if (this.panel.expanded) this.panel.close();
    else this.panel.open();
  }

  public toggleSidenav(): void {
    this.store.dispatch(new ToggleSideNav());
  }

  public signout(): void {
    this.authService.logout();
  }

  public resetPassword(): void {
    this.authService.redirectToPasswordReset();
  }

  public navigateToUserProfile(): void {
    this.router.navigateByUrl('user-profile');
  }
}
