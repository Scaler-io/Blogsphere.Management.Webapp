import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiProductDetailsComponent } from './api-product-details.component';

describe('ApiProductDetailsComponent', () => {
  let component: ApiProductDetailsComponent;
  let fixture: ComponentFixture<ApiProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
