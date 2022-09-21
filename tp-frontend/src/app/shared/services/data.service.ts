import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = environment.apiUrl;
  posts: any = [];
  mostClickedPosts$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

  reloadMostClickedPosts() {
    this.getMostClickedPosts().subscribe((response: any) => {
      this.mostClickedPosts$.next(response);
    });
  }

  getPosts(title: string): Observable<Response> {
    let params = new HttpParams().set('title', title);
    return this.http.get<Response>(this.baseUrl + 'posts', { params: params });
  }
  getUsers(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + 'users');
  }
  editUser(request:any,idUser:number): Observable<Response> {
    return this.http.put<Response>(this.baseUrl + 'users/'+idUser, request);
  }
  editCategory(request:any,idCategory:number): Observable<Response> {
    return this.http.put<Response>(this.baseUrl + 'categories/'+idCategory, request);
  }
  editProvinces(request:any,idProvince:number): Observable<Response> {
    return this.http.put<Response>(this.baseUrl + 'provinces/'+idProvince, request);
  }
  delUser(idUser:number): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + 'users/'+idUser);
  }
  getMostClickedPosts(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + 'posts/mostClicked');
  }
  getProvinces(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + 'provinces');
  }
  getCategories(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + 'categories');
  }

  deletePost(id: string) : Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + 'posts/' + id);
  }

  delProvinces(id: string) : Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + 'provinces/' + id);
  }

  delCategory(id: string) : Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + 'categories/' + id);
  }

  userExists(request:any): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + 'users/'+request.username+'/exists')
  }

  getMoneyExchange(): Observable<Response>{
    return this.http.get<Response>('https://api.bluelytics.com.ar/v2/latest')

  }

  emailExists(request:any): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + 'users/'+request.email+'/existemail')
  }

  addUser(request: any): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(this.baseUrl + 'users', request);
  }

  addProvince(request: any): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(this.baseUrl + 'provinces', request);
  }

  addCategory(request: any): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(this.baseUrl + 'categories', request);
  }

  getPostsByIdWithAuthor(idPost: number): Observable<Response> {
    return this.http.get<Response>(this.baseUrl +'posts/'+ idPost + '/autor');
  }

  addPost(request: any): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.post<ArrayBuffer>(this.baseUrl + 'posts/', request,{ observe: 'response' });
  }

}
