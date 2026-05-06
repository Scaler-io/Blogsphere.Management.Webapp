import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserComponent } from './app-user.component';

describe('AppUserComponent', () => {
  let component: AppUserComponent;
  let fixture: ComponentFixture<AppUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUserComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
