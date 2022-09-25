import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/models/author';
import { RequestResponse } from 'src/app/models/Responses/requestResponse';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  author: Author = new Author();
  idAuthor: number = 0;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.idAuthor = parseInt(this.route.snapshot.paramMap.get("id") ?? "0");
    console.log("Id author" + this.idAuthor);
    this.dataService.getUserWithPosts(this.idAuthor).subscribe(
      (response: RequestResponse<Author>) => {
        console.log("-------------------------------------");
        console.log(response);
        this.author = response.data;
      }
    );
  }

}
