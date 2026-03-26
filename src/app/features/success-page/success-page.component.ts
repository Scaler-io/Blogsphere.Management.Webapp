import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonSize, ButtonType } from 'src/app/core/model/core';
import { selectRequestPageState } from 'src/app/state/request-page/request-page-selector';
import { RequestPageClear } from 'src/app/state/request-page/request-page.action';
import { AppState } from 'src/app/store/app.state';
import * as ApiClusterActions from 'src/app/state/api-cluster/api-custer.action';

@Component({
    selector: 'blogsphere-success-page',
    templateUrl: './success-page.component.html',
    styleUrls: ['./success-page.component.scss'],
    standalone: false
})
export class SuccessPageComponent implements OnInit {
  public requestPageState$ = this.store.select(selectRequestPageState);

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {}

  public previousClick(previousUrl: string): void {
    this.store.dispatch(new RequestPageClear());
    this.store.dispatch(new ApiClusterActions.ResetCreateSuccess());
    this.router.navigateByUrl(previousUrl);
  }

  public nextClick(nextUrl: string): void {
    this.store.dispatch(new RequestPageClear());
    this.store.dispatch(new ApiClusterActions.ResetCreateSuccess());
    this.router.navigateByUrl(nextUrl);
  }
}
