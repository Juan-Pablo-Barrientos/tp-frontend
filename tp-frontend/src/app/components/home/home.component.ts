import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: any;
  constructor(public dataService: DataService, private route: ActivatedRoute) { }
  titleSearch: any = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.titleSearch = params["searchbar"]
    })
    this.dataService.getPosts(this.titleSearch ??= "").subscribe((response: any) => {
      this.dataService.posts = response.data;
    });
  }
}
