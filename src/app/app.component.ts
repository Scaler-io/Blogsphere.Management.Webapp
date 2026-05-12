import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { SetMobileView } from './state/mobile-view/mobile-view.action';
import { AuthManagerService } from './core/auth/auth-manager.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'blogsphere-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  public isMobileView: boolean = false;
  public isAuthenticated: boolean = false;
  public isAppBusy: boolean = false;
  public maintenanceMode: boolean = environment.maintenanceMode;
  public isProfilePage: boolean = false;

  constructor(
    private store: Store<AppState>,
    private authManager: AuthManagerService,
    private router: Router
  ) {
    this.updateProfilePageVisibility(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && this.router.url === '/') {
        this.isAppBusy = true;
      } else {
        setTimeout(() => {
          this.isAppBusy = false;
        }, 2000);
      }

      if (event instanceof NavigationEnd) {
        this.updateProfilePageVisibility(event.urlAfterRedirects);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const windowWidth = window.innerWidth;
    if (windowWidth < 576 && !this.isMobileView) {
      this.store.dispatch(new SetMobileView(true));
      this.isMobileView = true;
    } else if (windowWidth >= 576 && this.isMobileView) {
      this.store.dispatch(new SetMobileView(false));
      this.isMobileView = false;
    }
  }

  ngOnInit(): void {
    this.checkIfMobileView();
    this.storeAccountManageSuccessFromUrl();
    this.initializeAuthentication();
  }

  private storeAccountManageSuccessFromUrl(): void {
    const params = new URLSearchParams(window.location.search);
    const twoFactorStatus = params.get('twoFactor');
    if (twoFactorStatus === 'enabled' || twoFactorStatus === 'disabled') {
      sessionStorage.setItem('twoFactorStatus', twoFactorStatus);
    }

    if (params.get('phone') === 'verified') {
      sessionStorage.setItem('phoneVerified', 'true');
    }

    if (params.get('passwordReset') === 'success') {
      sessionStorage.setItem('passwordResetSuccess', 'true');
    }
  }

  private checkIfMobileView(): void {
    if (window.innerWidth < 576) {
      this.isMobileView = true;
      this.store.dispatch(new SetMobileView(true));
    } else {
      this.isMobileView = false;
      this.store.dispatch(new SetMobileView(false));
    }
  }

  private updateProfilePageVisibility(url: string): void {
    this.isProfilePage = url.includes('/user-profile');
  }

  private initializeAuthentication(): void {
    this.authManager.initializeAuthentication().subscribe({
      next: isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      },
      error: error => {
        this.isAuthenticated = false;
      },
    });
  }

  ngOnDestroy(): void {
    // Clean up authentication manager
    this.authManager.cleanup();
  }
}
