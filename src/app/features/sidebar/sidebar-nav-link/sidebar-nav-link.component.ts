import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'blogsphere-sidebar-nav-link',
  templateUrl: './sidebar-nav-link.component.html',
  styleUrls: ['./sidebar-nav-link.component.scss'],
  standalone: false,
})
export class SidebarNavLinkComponent {
  @Input() link = '';
  @Input() icon = '';
  @Input() label = '';
  @Output() navigate = new EventEmitter<void>();
}
