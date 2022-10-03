import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  legalDollar: any;
  illegalDollar: any;
  legalEuro: any;
  illegalEuro: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getMoneyExchange().subscribe((res: any) => {
      this.legalDollar = res.oficial;
      this.illegalDollar = res.blue;
      this.legalEuro = res.oficial_euro;
      this.illegalEuro = res.blue_euro;
    });
  }
}
