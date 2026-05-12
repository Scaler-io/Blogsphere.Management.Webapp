import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementUserComponent } from './management-user.component';

describe('ManagementUserComponent', () => {
  let component: ManagementUserComponent;
  let fixture: ComponentFixture<ManagementUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagementUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementUserComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
