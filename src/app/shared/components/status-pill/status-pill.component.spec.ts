import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusPillComponent } from './status-pill.component';
import { StatusPillModule } from './status-pill.module';

describe('StatusPillComponent', () => {
  let component: StatusPillComponent;
  let fixture: ComponentFixture<StatusPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusPillModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
