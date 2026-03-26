import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserManagementDashboardResponse } from 'src/app/core/model/dashboard.model';

@Component({
  selector: 'blogsphere-user-management-dashboard',
  templateUrl: './user-management-dashboard.component.html',
  styleUrls: ['./user-management-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UserManagementDashboardComponent implements OnChanges {
  @Input({ required: true }) summary!: UserManagementDashboardResponse;

  public totalUsers = 0;
  public totalActiveUsers = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['summary']?.currentValue) {
      const response = changes['summary'].currentValue as UserManagementDashboardResponse;
      this.totalUsers = response.summary?.totalUsers ?? 0;
      this.totalActiveUsers = response.summary?.activeUsers ?? 0;
    }
  }
}
