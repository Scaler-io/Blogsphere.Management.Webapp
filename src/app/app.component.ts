import { Component, HostListener, OnInit } from '@angular/core';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { SetMobileView } from './state/mobile-view/mobile-view.action';

@Component({
  selector: 'blogsphere-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '13';
  public isMobileView: boolean = false;

  constructor(private store: Store<AppState>) {}

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
}
