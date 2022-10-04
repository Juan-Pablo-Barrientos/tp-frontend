import { Component, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  title: string = '';
  mostClickedPosts: any[] = [];

  constructor(private dataService: DataService, public authService: AuthService) {}

  ngOnInit(): void {
    this.dataService.mostClickedPosts$.subscribe((response) => {
      if (response.data) {
        this.mostClickedPosts = response.data.slice(0,5);
      }
    });
  }

  search() {
    this.dataService.getPosts(this.title,null,null).subscribe((response: any) => {
      this.dataService.posts = response.data;
    });
  }

  inputChange() {
    if (this.title.length === 0) {
      this.search();
    }
  }

  logOut() {
    this.authService.logout();
  }
}
