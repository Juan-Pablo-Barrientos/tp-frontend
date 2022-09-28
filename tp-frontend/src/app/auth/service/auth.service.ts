import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUserName!: string | null;
  private loggedUserRole!: number | null;
  private loggedUserId!: number | null;
  public loggedUser:any|null;

  constructor(private http: HttpClient ,private router:Router) { }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}users/login`, user)
      .pipe(tap((data)=>{this.loggedUser=data.data;}),
        tap((data)=> !!data.data.jwt ?  this.doLoginUser(user.username, data.data.jwt) :throwError(() => new Error('test'))),
        map(()=>true),
        catchError(error => {
          return of(false);
        }));
  }

  restoreLoggedUser(){
    if(this.getDecodedAccessToken(this.getJwtToken()!).id_user){
      this.loggedUserId = this.getDecodedAccessToken(this.getJwtToken()!).id_user
      this.http.get<Response>(`${environment.apiUrl}users/` + this.loggedUserId).subscribe( (response: any) => {
        this.loggedUser = response.data;
      })} else{
      this.logout();
    }
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  getUserRole():string{
    let role
    (this.getJwtToken()) ? role = this.getDecodedAccessToken(this.getJwtToken()!).role : role=null
    return role
  }

  getUserId():string{
    let id_user
    (this.getJwtToken()) ? id_user = this.getDecodedAccessToken(this.getJwtToken()!).id_user : id_user=null
    return id_user
  }

  logout() {
    this.doLogoutUser();
    if (this.router.url!== '/login') {this.router.navigate(['/home']);}
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  isLoggedInAdmin():boolean {
    if(this.loggedUser?.rol === 1){ return true}
    else {return false};
  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  getLoggedUser() {
    return this.loggedUser;
  }
  private doLoginUser(username: string, jwt:string) {
    this.loggedUserName = username;
    this.storeJwtToken(jwt);
  }

  private doLogoutUser() {
    this.loggedUserName = null;
    this.loggedUserRole = null;
    this.removeTokens();
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }



}
