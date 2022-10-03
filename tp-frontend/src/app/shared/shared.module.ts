import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidebarComponent, CurrenciesComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule, FormsModule, NgbModule,],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, CurrenciesComponent],
})
export class SharedModule { }
