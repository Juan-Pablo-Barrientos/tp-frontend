import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  legalDollar: any;
  illegalDollar: any;
  legalEuro: any;
  illegalEuro: any;
  mostClickedPosts : any[] = [];

  constructor(public authService:AuthService, private dataService:DataService) { }

  ngOnInit(): void {

    this.dataService.mostClickedPosts$.subscribe((response) => {
      if (response.data) {
        this.mostClickedPosts = response.data.slice(0,5);
      }
    });

    this.dataService.getMoneyExchange().subscribe((res:any)=>{
      this.legalDollar=res.oficial
      this.illegalDollar=res.blue
      this.legalEuro=res.oficial_euro
      this.illegalEuro=res.blue_euro
    })
    }
  }


