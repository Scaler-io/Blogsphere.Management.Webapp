import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiClusterComponent } from './api-cluster.component';

describe('ApiClusterComponent', () => {
  let component: ApiClusterComponent;
  let fixture: ComponentFixture<ApiClusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiClusterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
