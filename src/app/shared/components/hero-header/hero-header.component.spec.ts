import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

import { HeroHeaderComponent } from './hero-header.component';

describe('HeroHeaderComponent', () => {
  let component: HeroHeaderComponent;
  let fixture: ComponentFixture<HeroHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroHeaderComponent],
      imports: [ButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

