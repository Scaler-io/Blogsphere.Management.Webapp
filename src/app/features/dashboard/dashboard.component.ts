import { Component, OnInit } from '@angular/core';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';

@Component({
  selector: 'blogsphere-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeSlideInOut],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
