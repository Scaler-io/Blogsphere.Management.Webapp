import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegmentedControlComponent } from './segmented-control.component';
import { SegmentedControlModule } from './segmented-control.module';

describe('SegmentedControlComponent', () => {
  let component: SegmentedControlComponent;
  let fixture: ComponentFixture<SegmentedControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentedControlModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentedControlComponent);
    component = fixture.componentInstance;
    component.options = [
      { id: '7d', label: '7d' },
      { id: '30d', label: '30d' },
    ];
    component.value = '7d';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
