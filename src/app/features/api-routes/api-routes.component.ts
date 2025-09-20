import { Component, OnInit } from '@angular/core';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';

@Component({
  selector: 'blogsphere-api-routes',
  templateUrl: './api-routes.component.html',
  styleUrls: ['./api-routes.component.scss'],
  animations: [fadeSlideInOut],
})
export class ApiRoutesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
