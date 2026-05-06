import { Component } from '@angular/core';
import { fadeSlideInOut } from 'src/app/core/animations/fade-in-out';

@Component({
  selector: 'blogsphere-app-user',
  animations: [fadeSlideInOut],
  standalone: false,
  templateUrl: './app-user.component.html',
  styleUrl: './app-user.component.scss',
})
export class AppUserComponent {

}
