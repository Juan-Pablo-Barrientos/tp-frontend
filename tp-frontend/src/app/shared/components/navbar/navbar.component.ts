import { Component, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title: string = "";
  constructor(private dataService: DataService, public authService:AuthService) { }
  ngOnInit(): void {
  }
  search() {
    this.dataService.getPosts(this.title).subscribe((response: any) => {
      this.dataService.posts = response.data;
    });
  }
  inputChange() {
    if (this.title.length === 0) {
      this.search();
    }
  }

  logOut(){
    this.authService.logout();
  }

}

