import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CardComponent } from './components/card/card.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorGuard } from './auth/guards/author.guard';
import { ProvinceListComponent } from './components/province-list/province-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { UserComponent } from './components/user/user.component';
import { DisqusModule } from 'ngx-disqus';
import { PollListComponent } from './components/poll-list/poll-list.component';
import { EditPostComponent } from './auth/views/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    RegisterComponent,
    PostDetailsComponent,
    UserListComponent,
    CardComponent,
    ProvinceListComponent,
    CategoryListComponent,
    UserComponent,
    PollListComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DisqusModule.forRoot('fakenews-4'),
    HttpClientJsonpModule
  ],
  providers: [AuthGuard,AuthorGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
