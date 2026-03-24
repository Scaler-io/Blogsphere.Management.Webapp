import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'blogsphere-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: false
})
export class LoaderComponent implements OnInit {
  @Input() enabled: boolean;

  constructor() {}

  ngOnInit(): void {}
}
