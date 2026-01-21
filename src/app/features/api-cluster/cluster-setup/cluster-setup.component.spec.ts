import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterSetupComponent } from './cluster-setup.component';

describe('ClusterSetupComponent', () => {
  let component: ClusterSetupComponent;
  let fixture: ComponentFixture<ClusterSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
