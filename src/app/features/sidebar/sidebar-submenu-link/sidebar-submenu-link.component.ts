import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'blogsphere-sidebar-submenu-link',
  templateUrl: './sidebar-submenu-link.component.html',
  styleUrls: ['./sidebar-submenu-link.component.scss'],
  standalone: false,
})
export class SidebarSubmenuLinkComponent {
  @Input() link = '';
  @Input() icon = '';
  @Input() label = '';
  @Output() navigate = new EventEmitter<void>();
}
