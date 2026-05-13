import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetricCardComponent } from './metric-card.component';
import { MetricCardModule } from './metric-card.module';

describe('MetricCardComponent', () => {
  let component: MetricCardComponent;
  let fixture: ComponentFixture<MetricCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MetricCardComponent);
    component = fixture.componentInstance;
    component.label = 'Total';
    component.value = '0';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
