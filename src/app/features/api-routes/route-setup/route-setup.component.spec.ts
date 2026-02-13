import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSetupComponent } from './route-setup.component';

describe('RouteSetupComponent', () => {
  let component: RouteSetupComponent;
  let fixture: ComponentFixture<RouteSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
