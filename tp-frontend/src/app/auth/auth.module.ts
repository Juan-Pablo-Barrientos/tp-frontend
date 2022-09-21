import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RedactPostComponent } from './views/redact-post/redact-post.component';
import { AuthorGuard } from './guards/author.guard';



@NgModule({
  declarations: [
    LoginComponent,
    RedactPostComponent
  ],
  providers:[
    AuthGuard,
    AuthorGuard
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthModule { }
