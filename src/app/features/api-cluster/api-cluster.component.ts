import { Component, OnInit } from '@angular/core';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';

@Component({
  selector: 'blogsphere-api-cluster',
  templateUrl: './api-cluster.component.html',
  styleUrls: ['./api-cluster.component.scss'],
  animations: [fadeSlideInOut],
})
export class ApiClusterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
