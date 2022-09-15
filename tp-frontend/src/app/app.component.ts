import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tp-frontend';

  constructor(private router:Router, private dataService:DataService){}



  refreshMostClicked(){
    if (this.router.url== '/'||this.router.url== '/home'){
      this.dataService.getMostClickedPosts().subscribe((response: any) => {
        this.dataService.mostClickedPosts = response.data;
      });
    }
  }

}
