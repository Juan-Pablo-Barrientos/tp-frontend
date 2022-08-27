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

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let idPost = +this.route.snapshot.paramMap.get("id")!;
    this.dataService.getPostsByIdWithAuthor(idPost).subscribe((response: any) => {
      this.postAuthor = response.data;
      console.log(this.postAuthor);
    });
  }
}
