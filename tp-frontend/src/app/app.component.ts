import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/service/auth.service';
import { DataService } from './shared/services/data.service';
import { LoaderService } from './shared/services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tp-frontend';

  constructor(public router: Router, private dataService: DataService, private authService: AuthService, private loadingService:LoaderService) {}

  ngOnInit(): void {
    this.dataService.reloadMostClickedPosts();
    this.dataService.reloadtodayPoll();
    this.dataService.reloadTodayWeather();
    this.authService.loggedUser===undefined ? this.authService.restoreLoggedUser() : null;
  }

  refreshMostClicked() {
    this.dataService.reloadMostClickedPosts();
    this.dataService.reloadtodayPoll();
    this.dataService.reloadTodayWeather();
  }
}
