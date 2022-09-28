import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/service/auth.service';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tp-frontend';

  constructor(private router: Router, private dataService: DataService, private authService: AuthService) {}

  ngOnInit(): void {
    this.dataService.reloadMostClickedPosts();
    this.authService.loggedUser===undefined ? this.authService.restoreLoggedUser() : null;
  }

  refreshMostClicked() {
    this.dataService.reloadMostClickedPosts();
  }
}
