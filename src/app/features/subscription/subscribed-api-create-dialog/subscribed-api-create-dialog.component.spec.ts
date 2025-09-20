import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedApiCreateDialogComponent } from './subscribed-api-create-dialog.component';

describe('SubscribedApiCreateDialogComponent', () => {
  let component: SubscribedApiCreateDialogComponent;
  let fixture: ComponentFixture<SubscribedApiCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedApiCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedApiCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
