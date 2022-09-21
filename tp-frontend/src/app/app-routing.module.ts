import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './auth/views/login/login.component';
import { RedactPostComponent } from './auth/views/redact-post/redact-post.component';
import { HomeComponent } from './components/home/home.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthorGuard } from './auth/guards/author.guard';
import { UserListComponent } from './components/user-list/user-list.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'Home/:titulo',
    component: HomeComponent,
  },
  {
    path: 'userList',
    component: UserListComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'PostAuthor/:id',
    component: PostDetailsComponent
  },
  {
    path: 'redactPost',
    component: RedactPostComponent,
    canActivate:[AuthorGuard],
    canLoad:[AuthorGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
