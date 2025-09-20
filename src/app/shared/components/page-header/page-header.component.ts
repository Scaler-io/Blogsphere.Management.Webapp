import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'blogsphere-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  public pageIcon: string;
  public pageName: string;
  public isBusy: boolean;
  public isSuccessPage: boolean;
  public isGenericErrorPage: boolean;

  private pageIconMap = {
    ['Dashboard']: 'dashboard',
    ['Clusters']: 'hub',
    ['Routes']: 'route',
    ['Subscription manager']: 'subscriptions'
  }
  
  constructor(private breadcrumb: BreadcrumbService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.isSuccessPage = this.router.url.includes('/success');
        this.isGenericErrorPage = this.router.url.includes('/generic-error');
      }
    });
    
    this.breadcrumb.breadcrumbs$.subscribe(page => {
      if(page){
        const pageLabel = page[page.length - 1]?.label as string;
        this.pageName = pageLabel;
        this.pageIcon = this.pageIconMap[page[0]?.label.toString()];
        this.isBusy = false;
      }
    });
  }

}
