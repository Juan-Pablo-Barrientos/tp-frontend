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
import { ProvinceListComponent } from './components/province-list/province-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { UserComponent } from './components/user/user.component';
import { PollListComponent } from './components/poll-list/poll-list.component';
import { EditPostComponent } from './auth/views/edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Fake News'
  },
  {
    path: 'Home/:titulo',
    component: HomeComponent,
    title: 'Fake News'
  },
  {
    path: 'userList',
    component: UserListComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
    title: 'Listado de usuarios'
  },
  {
    path: 'provinceList',
    component: ProvinceListComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
    title: 'Listado de provincias'
  },
  {
    path: 'categoryList',
    component: CategoryListComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
    title: 'Listado de categorias'
  },
  {
    path: 'pollList',
    component: PollListComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
    title: 'Listado de encuestas'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registro'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar sesión'
  },
  {
    path: 'PostAuthor/:id',
    component: PostDetailsComponent,
    title: 'Fake News'
  },
  {
    path: 'redactPost',
    component: RedactPostComponent,
    canActivate:[AuthorGuard],
    canLoad:[AuthorGuard],
    title: 'Redactar noticia'
  },
  {
    path: 'editPost/:id',
    component: EditPostComponent,
    canActivate:[AuthorGuard],
    canLoad:[AuthorGuard],
    title: 'Editar noticia'
  },
  {
    path: 'user/:id',
    component: UserComponent,
    title: 'Fake News'
  },
  {
    path: '**',
    redirectTo: '',
    title: 'Fake News'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
