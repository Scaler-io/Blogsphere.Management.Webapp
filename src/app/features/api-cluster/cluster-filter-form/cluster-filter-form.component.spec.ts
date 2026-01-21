import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterFilterFormComponent } from './cluster-filter-form.component';

describe('ClusterFilterFormComponent', () => {
  let component: ClusterFilterFormComponent;
  let fixture: ComponentFixture<ClusterFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterFilterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
