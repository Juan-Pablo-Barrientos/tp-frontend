import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidebarComponent, CurrenciesComponent, SpinnerComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule, FormsModule, NgbModule,FormsModule,ReactiveFormsModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, CurrenciesComponent, SpinnerComponent],
})
export class SharedModule { }
