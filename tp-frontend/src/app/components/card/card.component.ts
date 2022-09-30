import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() post : Post = new Post();

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    const disqus = document.getElementById(this.post.id.toString());
    disqus?.setAttribute("data-disqus-identifier", 'PostAuthor/'+this.post.id.toString() );
  }

}
