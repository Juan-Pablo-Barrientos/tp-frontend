import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tp-frontend';

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.reloadMostClickedPosts();
  }

  refreshMostClicked() {
    this.dataService.reloadMostClickedPosts();
  }
}
