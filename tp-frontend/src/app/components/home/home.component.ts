import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RequestResponse } from 'src/app/models/Responses/requestResponse';
import { Post } from 'src/app/models/post';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = new Array();
  id_category: any;
  filterForm: any;
  id_province: any;
  categories: any;
  provinces: any;
  constructor(public dataService: DataService, private route: ActivatedRoute) { }
  titleSearch: any = "";

  ngOnInit(): void {

    this.filterForm = new FormGroup({
      category: new FormControl(''),
      province:new FormControl('')
    })

   this.dataService.getCategories().subscribe((response:any)=>{
    this.categories=response.data;
   })

   this.dataService.getProvinces().subscribe((response:any)=>{
    this.provinces=response.data;
   })

    this.route.queryParams.subscribe(params => {
      this.titleSearch = params["searchbar"]
    })
    this.dataService.getPosts(this.titleSearch ??= "",null,null).subscribe((response: RequestResponse<Post[]>) => {
      this.dataService.posts = response.data;
    });
  }

  cleanFilter(){
    this.id_category=null
    this.id_province=null
    this.filterForm.reset()
    this.filterForm.controls.province.setValue('')
    this.dataService.getPosts(this.titleSearch ??= "",null,null).subscribe((response: any) => {
    this.dataService.posts = response.data;
    });
  }

  filter(){
      this.dataService.posts=[]
      this.dataService.getPosts('', this.filterForm.controls.category.value, this.filterForm.controls.province.value ).subscribe((response: any) => {
      this.dataService.posts = response.data;
    });}

}
