import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts : any;
  constructor(private dataService: DataService, private route:ActivatedRoute) {}
  titleSearch:String="";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.titleSearch=params["searchbar"]
    })

    if (this.titleSearch!=="" && this.titleSearch!=null) {
      this.dataService.getPostsByTitle(this.titleSearch).subscribe((response:any)=>{
        this.posts = response.data;
      })
    }else{
      this.dataService.getPosts().subscribe((response : any) => {
      this.posts = response.data;
    });}
  }

}
