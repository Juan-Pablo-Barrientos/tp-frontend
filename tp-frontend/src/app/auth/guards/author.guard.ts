import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorGuard implements CanActivate, CanLoad {

  User:any;

  constructor(private authService: AuthService, private router: Router, private dataService: DataService, private toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ((this.authService.getUserRole()==='Author')||(this.authService.getUserRole()==='Admin')) {
      return true
    }else {
      this.toastr.error('No tiene permiso para acceder a esta seccion.', 'Error 🥺' ,{positionClass:'toast-bottom-right'})}
      return this.router.parseUrl('');
    }


  canLoad() {
    if ((this.authService.getUserRole()==='Author')||(this.authService.getUserRole()==='Admin')) {
      return true
    }else {
      return false;
    }
  }
}
