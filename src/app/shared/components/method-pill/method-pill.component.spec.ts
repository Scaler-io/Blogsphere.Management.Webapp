import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MethodPillComponent } from './method-pill.component';
import { MethodPillModule } from './method-pill.module';

describe('MethodPillComponent', () => {
  let component: MethodPillComponent;
  let fixture: ComponentFixture<MethodPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodPillModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MethodPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
