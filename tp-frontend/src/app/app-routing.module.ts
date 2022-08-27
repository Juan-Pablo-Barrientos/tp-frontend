import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from './components/home/home.component';
import { PostAuthorComponent } from './components/post-author/post-author.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';

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
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'PostAuthor/:id',
    component: PostAuthorComponent
  },
  {
    path: '**',
    redirectTo: '',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
