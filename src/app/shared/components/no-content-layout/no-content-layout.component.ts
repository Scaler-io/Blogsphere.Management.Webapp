import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ButtonType, ButtonSize, IconType } from 'src/app/core/model/core';

@Component({
    selector: 'blogsphere-no-content-layout',
    templateUrl: './no-content-layout.component.html',
    styleUrls: ['./no-content-layout.component.scss'],
    standalone: false
})
export class NoContentLayoutComponent implements OnInit {
  @Input() title: string = 'No Data Available';
  @Input() subtitle: string =
    'There is currently no data to display. You can create new content to get started.';
  @Input() buttonLabel: string = 'Create';
  @Input() showButton: boolean = true;
  @Input() iconType: IconType;
  @Input() customIconSvg: string = '';

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  ButtonType = ButtonType;
  ButtonSize = ButtonSize;

  constructor() {}

  ngOnInit(): void {}

  public onButtonClick(): void {
    this.buttonClick.emit();
  }
}
