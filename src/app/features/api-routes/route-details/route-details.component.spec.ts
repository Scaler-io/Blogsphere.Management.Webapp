import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { MatDialog } from '@angular/material/dialog';

import { RouteDetailsComponent } from './route-details.component';

describe('RouteDetailsComponent', () => {
  let component: RouteDetailsComponent;
  let fixture: ComponentFixture<RouteDetailsComponent>;

  beforeEach(async () => {
    const storeStub = {
      select: () => of(null),
      dispatch: () => undefined,
    };

    await TestBed.configureTestingModule({
      declarations: [RouteDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 'test-id' } },
          },
        },
        { provide: Store, useValue: storeStub },
        { provide: BreadcrumbService, useValue: { set: () => undefined } },
        { provide: Router, useValue: { navigate: () => Promise.resolve(true) } },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(false) }) } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
