import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  User:any;

  constructor(private authService: AuthService, private router: Router, private dataService: DataService, private toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.getUserRole()==='Admin') {
      return true
    }else {
      this.toastr.error('No tiene permiso para acceder a esta seccion.', 'Error 🥺' ,{positionClass:'toast-bottom-right'})}
      return this.router.parseUrl('/home');
    }


  canLoad() {
    if (this.authService.getUserRole()==='Admin') {
      return true
    }else {
      return false;
    }
  }
}
