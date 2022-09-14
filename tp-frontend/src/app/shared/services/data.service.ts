import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = environment.apiUrl;
  posts: any = [];
  constructor(private http: HttpClient) { }

  getPosts(title: string): Observable<Response> {
    let params = new HttpParams().set('title', title);
    return this.http.get<Response>(this.baseUrl + 'posts', { params: params });
  }

  deletePost(id: string) : Observable<Response> {
    let params = new HttpParams().set('id', id);
    return this.http.delete<Response>(this.baseUrl + 'posts/' + id, { params: params });
  }

  userExists(username: string): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + 'user/userExist/' + username)

  }

  addUser(request: any): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(this.baseUrl + 'user', request);
  }

  getPostsByIdWithAuthor(idPost: number): Observable<Response> {
    return this.http.get<Response>(this.baseUrl +'posts/'+ idPost + '/autor');
  }
}
