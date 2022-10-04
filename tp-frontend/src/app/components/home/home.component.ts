import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RequestResponse } from 'src/app/models/Responses/requestResponse';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = new Array();
  constructor(public dataService: DataService, private route: ActivatedRoute) { }
  titleSearch: any = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.titleSearch = params["searchbar"]
    })
    this.dataService.getPosts(this.titleSearch ??= "").subscribe((response: RequestResponse<Post[]>) => {
      this.dataService.posts = response.data;
    });
  }
}
