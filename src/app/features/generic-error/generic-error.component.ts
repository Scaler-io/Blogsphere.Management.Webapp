import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectErrorComponentRoute,
  selectErrorSource,
} from 'src/app/state/error/error.selector';
import { ResetError } from 'src/app/state/error/error.action';

@Component({
  selector: 'blogsphere-generic-error',
  templateUrl: './generic-error.component.html',
  styleUrls: ['./generic-error.component.scss'],
})
export class GenericErrorComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}

  public error$ = this.store.select(selectError);
  public errorSource$ = this.store.select(selectErrorSource);
  public errorComponentRoute$ = this.store.select(selectErrorComponentRoute);

  ngOnInit(): void {}

  public goBackToOrigin(): void {
    this.errorComponentRoute$
      .subscribe((route) => {
        if (route) {
          this.router.navigate([route]);
        } else {
          this.router.navigate(['/dashboard']);
        }
      })
      .unsubscribe();
  }

  public goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public get sourcePage(): string {
    let page = '';
    this.errorComponentRoute$.subscribe((route) => {
      if (route) {
        page = route.substring(1);
      } else {
        page = 'Dashboard';
      }
    }).unsubscribe();
    return page;
  }
}
