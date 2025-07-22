import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { getMobileViewState } from 'src/app/state/mobile-view/mobile-view.selector';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ToggleSideNav } from 'src/app/state/sidenav/sidenav.action';

@Component({
  selector: 'blogsphere-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;

  public isMobileView$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isMobileView$ = this.store.select(getMobileViewState);
  }

  public toggleAccordion(): void {
    if (this.panel.expanded) this.panel.close();
    else this.panel.open();
  }

  public toggleSidenav(): void {
    this.store.dispatch(new ToggleSideNav());
  }
}
