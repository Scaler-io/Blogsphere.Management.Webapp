import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickActionTileComponent } from './quick-action-tile.component';
import { QuickActionTileModule } from './quick-action-tile.module';

describe('QuickActionTileComponent', () => {
  let component: QuickActionTileComponent;
  let fixture: ComponentFixture<QuickActionTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickActionTileModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickActionTileComponent);
    component = fixture.componentInstance;
    component.icon = 'home';
    component.label = 'Home';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
