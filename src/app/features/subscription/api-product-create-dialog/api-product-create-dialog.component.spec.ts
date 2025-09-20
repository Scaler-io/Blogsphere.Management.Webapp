import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiProductCreateDialogComponent } from './api-product-create-dialog.component';

describe('ApiProductCreateDialogComponent', () => {
  let component: ApiProductCreateDialogComponent;
  let fixture: ComponentFixture<ApiProductCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiProductCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiProductCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
