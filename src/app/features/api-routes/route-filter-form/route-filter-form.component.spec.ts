import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteFilterFormComponent } from './route-filter-form.component';

describe('RouteFilterFormComponent', () => {
  let component: RouteFilterFormComponent;
  let fixture: ComponentFixture<RouteFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteFilterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteFilterFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
