import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCreateDialogComponent } from './subscription-create-dialog.component';

describe('SubscriptionCreateDialogComponent', () => {
  let component: SubscriptionCreateDialogComponent;
  let fixture: ComponentFixture<SubscriptionCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
