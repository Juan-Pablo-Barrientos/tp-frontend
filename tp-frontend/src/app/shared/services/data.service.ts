import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Author } from 'src/app/models/author';
import { Category } from 'src/app/models/category';
import { Poll } from 'src/app/models/poll';
import { Post } from 'src/app/models/post';
import { Province } from 'src/app/models/province';
import { RequestResponse } from 'src/app/models/Responses/requestResponse';
import { ResponseExists } from 'src/app/models/Responses/responseExists';
import { ResponseWithMessage } from 'src/app/models/Responses/responseWithMessage';
import { User } from 'src/app/models/user';
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

  getPosts(title: string): Observable<RequestResponse<Post[]>> {
    let params = new HttpParams().set('title', title);
    return this.http.get<RequestResponse<Post[]>>(this.baseUrl + 'posts', { params: params });
  }

  getUsers(): Observable<RequestResponse<Author[]>> {
    return this.http.get<RequestResponse<Author[]>>(this.baseUrl + 'users');
  }

  editUser(request: any, idUser: number): Observable<Response> {
    return this.http.put<Response>(this.baseUrl + 'users/' + idUser, request);
  }

  editCategory(request: Category, idCategory: number): Observable<RequestResponse<Category>> {
    return this.http.put<RequestResponse<Category>>(this.baseUrl + 'categories/' + idCategory, request);
  }

  editProvinces(request: any, idProvince: number): Observable<Response> {
    return this.http.put<Response>(this.baseUrl + 'provinces/' + idProvince, request);
  }

  editPoll(request: any, idPoll: number): Observable<Response> {
    return this.http.put<Response>(this.baseUrl + 'polls/' + idPoll, request);
  }

  delUser(idUser: number): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + 'users/' + idUser);
  }

  getMostClickedPosts(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + 'posts/mostClicked');
  }

  getProvinces(): Observable<RequestResponse<Province[]>> {
    return this.http.get<RequestResponse<Province[]>>(this.baseUrl + 'provinces');
  }

  getPolls(): Observable<RequestResponse<Poll[]>> {
    return this.http.get<RequestResponse<Poll[]>>(this.baseUrl + 'polls');
  }

  getCategories(): Observable<RequestResponse<Category[]>> {
    return this.http.get<RequestResponse<Category[]>>(this.baseUrl + 'categories');
  }

  deletePost(id: string): Observable<ResponseWithMessage<Post>> {
    return this.http.delete<ResponseWithMessage<Post>>(this.baseUrl + 'posts/' + id);
  }

  delProvinces(id: number): Observable<ResponseWithMessage<Province>> {
    return this.http.delete<ResponseWithMessage<Province>>(this.baseUrl + 'provinces/' + id);
  }

  delPoll(id: number): Observable<ResponseWithMessage<Poll>> {
    return this.http.delete<ResponseWithMessage<Poll>>(this.baseUrl + 'polls/' + id);
  }

  delCategory(id: number): Observable<ResponseWithMessage<Category>> {
    return this.http.delete<ResponseWithMessage<Category>>(this.baseUrl + 'categories/' + id);
  }

  userExists(request: User): Observable<ResponseExists<User>> {
    return this.http.get<ResponseExists<User>>(this.baseUrl + 'users/' + request.username + '/exists')
  }

  getMoneyExchange(): Observable<Response> {
    return this.http.get<Response>('https://api.bluelytics.com.ar/v2/latest')
  }

  emailExists(request: User): Observable<ResponseExists<User>> {
    return this.http.get<ResponseExists<User>>(this.baseUrl + 'users/' + request.email + '/existemail')
  }

  addUser(request: User): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(this.baseUrl + 'users', request);
  }

  addPoll(request: Poll): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(this.baseUrl + 'polls', request);
  }

  addProvince(request: any): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(this.baseUrl + 'provinces', request);
  }

  addCategory(request: Category): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(this.baseUrl + 'categories', request);
  }

  getPostsByIdWithAuthor(idPost: number): Observable<RequestResponse<Post>> {
    return this.http.get<RequestResponse<Post>>(this.baseUrl + 'posts/' + idPost + '/autor');
  }

  addPost(request: any): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.post<ArrayBuffer>(this.baseUrl + 'posts/', request, { observe: 'response' });
  }

  getUserWithPosts(idUser: number): Observable<RequestResponse<Author>> {
    return this.http.get<RequestResponse<Author>>(this.baseUrl + "users/" + idUser + "/posts");
  }

  editUserPassword(request: any): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(this.baseUrl + 'users/password/change', request);
  }

  editPost(request: any,idPost:any): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.put<ArrayBuffer>(this.baseUrl + 'posts/'+idPost, request,{ observe: 'response' });
  }

  getTodayPoll(): Observable<RequestResponse<Poll>> {
    return this.http.get<RequestResponse<Poll>>(this.baseUrl + "polls/today/poll");
  }

}
