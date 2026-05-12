import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

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
  @Input() collapsed = false;
  @Output() navigate = new EventEmitter<void>();

  @HostBinding('class.host--collapsed')
  get isCollapsedHost(): boolean {
    return this.collapsed;
  }
}
