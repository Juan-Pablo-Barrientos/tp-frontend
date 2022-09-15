import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public authService:AuthService, public dataService:DataService) { }

  ngOnInit(): void {


  }

}
