import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentLayoutComponent } from './no-content-layout.component';

describe('NoContentLayoutComponent', () => {
  let component: NoContentLayoutComponent;
  let fixture: ComponentFixture<NoContentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoContentLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
