import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'blogsphere-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: false,
})
export class PageHeaderComponent implements OnInit {
  public pageIcon: string;
  public pageName: string;
  public isBusy: boolean;
  public isSuccessPage: boolean;
  public isGenericErrorPage: boolean;
  public isMaintenancePage: boolean;

  private pageIconMap = {
    ['Dashboard']: 'dashboard',
    ['Clusters']: 'hub',
    ['Routes']: 'route',
    ['Subscription manager']: 'subscriptions',
    ['App users']: 'person',
    ['Management users']: 'admin_panel_settings',
  };

  constructor(
    private breadcrumb: BreadcrumbService,
    private router: Router
  ) {}

  private setPageVisibilityFlags(): void {
    this.isSuccessPage = this.router.url.includes('/success');
    this.isGenericErrorPage = this.router.url.includes('/error');
    this.isMaintenancePage = this.router.url.includes('/maintenance');
  }

  ngOnInit(): void {
    this.setPageVisibilityFlags();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setPageVisibilityFlags();
      }
    });

    this.breadcrumb.breadcrumbs$.subscribe(page => {
      if (page) {
        const pageLabel = page[page.length - 1]?.label as string;
        this.pageName = pageLabel;
        for(let len = page.length - 1; len >= 0; len--) {
          if(this.pageIconMap[page[len]?.label as string]) {
            this.pageIcon = this.pageIconMap[page[len]?.label as string];
            break;
          }
        }
        this.isBusy = false;
      }
    });
  }
}
