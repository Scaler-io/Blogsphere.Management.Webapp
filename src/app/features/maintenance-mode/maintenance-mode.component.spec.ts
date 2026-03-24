import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenanceModeComponent } from './maintenance-mode.component';
import { InfoCardModule } from 'src/app/shared/components/info-card/info-card.module';

describe('MaintenanceModeComponent', () => {
  let component: MaintenanceModeComponent;
  let fixture: ComponentFixture<MaintenanceModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaintenanceModeComponent],
      imports: [InfoCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
