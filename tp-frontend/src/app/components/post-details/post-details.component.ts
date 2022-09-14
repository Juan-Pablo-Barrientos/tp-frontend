import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  postDetails: any;
  idPost : string;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.idPost = this.route.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.dataService.getPostsByIdWithAuthor(parseInt(this.idPost)).subscribe((response: any) => {
      this.postDetails = response.data;
      console.log(this.postDetails);
    });
  }

  onClickDeleteButton(){
    this.dataService.deletePost(this.idPost).subscribe();
  }
}
