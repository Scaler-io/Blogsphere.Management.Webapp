import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KvRowComponent } from './kv-row.component';

describe('KvRowComponent', () => {
  let component: KvRowComponent;
  let fixture: ComponentFixture<KvRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KvRowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

