import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidebarComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
})
export class SharedModule {}
