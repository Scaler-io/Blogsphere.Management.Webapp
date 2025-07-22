import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRoutesComponent } from './api-routes.component';

describe('ApiRoutesComponent', () => {
  let component: ApiRoutesComponent;
  let fixture: ComponentFixture<ApiRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRoutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
