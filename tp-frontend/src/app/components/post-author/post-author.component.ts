import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-post-author',
  templateUrl: './post-author.component.html',
  styleUrls: ['./post-author.component.scss']
})
export class PostAuthorComponent implements OnInit {

  postAuthor: any;
  idPost : string;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.idPost = this.route.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.dataService.getPostsByIdWithAuthor(parseInt(this.idPost)).subscribe((response: any) => {
      this.postAuthor = response.data;
      console.log(this.postAuthor);
    });
  }

  onClickDeleteButton(){
    this.dataService.deletePost(this.idPost).subscribe();
  }
}
