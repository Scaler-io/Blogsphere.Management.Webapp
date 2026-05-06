import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementUserDetailsComponent } from './management-user-details.component';

describe('ManagementUserDetailsComponent', () => {
  let component: ManagementUserDetailsComponent;
  let fixture: ComponentFixture<ManagementUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagementUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementUserDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
