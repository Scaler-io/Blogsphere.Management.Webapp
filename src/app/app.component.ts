import { Component, HostListener, OnInit } from '@angular/core';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { SetMobileView } from './state/mobile-view/mobile-view.action';
import { AuthService } from './core/auth/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { SetAuthState } from './state/auth/auth.action';

@Component({
  selector: 'blogsphere-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '13';
  public isMobileView: boolean = false;
  public isAuthenticated: boolean = false;
  public isAppBusy: boolean = false;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && this.router.url === '/') {
        this.isAppBusy = true;
      } else {
        setTimeout(() => {
          this.isAppBusy = false;
        }, 2000);
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
    this.initializeAuthentication();
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

  private initializeAuthentication(): void {
    this.authService.checkAuth().subscribe((res) => {
      this.isAuthenticated = res.isAuthenticated;
      if (!this.isAuthenticated) this.authService.login();
      else {
        console.log('user is authenticated');
        this.store.dispatch(new SetAuthState(res));
      }
    });
  }
}
