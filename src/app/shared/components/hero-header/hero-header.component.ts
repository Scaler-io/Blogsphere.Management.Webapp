import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonSize, ButtonType } from 'src/app/core/model/core';

@Component({
  selector: 'blogsphere-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss'],
})
export class HeroHeaderComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  public isJsonView: boolean = false;

  @Input() showEditButton: boolean = true;
  @Input() showDeleteButton: boolean = true;

  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleView: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  public toggle(): void {
    this.isJsonView = !this.isJsonView;
    this.toggleView.emit();
  }
}
