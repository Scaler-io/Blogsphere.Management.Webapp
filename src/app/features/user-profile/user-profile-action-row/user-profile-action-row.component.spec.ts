import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileActionRowComponent } from './user-profile-action-row.component';
import { UserProfileActionRowModule } from './user-profile-action-row.module';

describe('UserProfileActionRowComponent', () => {
  let component: UserProfileActionRowComponent;
  let fixture: ComponentFixture<UserProfileActionRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [UserProfileActionRowModule] }).compileComponents();
    fixture = TestBed.createComponent(UserProfileActionRowComponent);
    component = fixture.componentInstance;
    component.icon = 'lock_reset';
    component.label = 'Change password';
    component.hint = 'Create a new password for your account';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
