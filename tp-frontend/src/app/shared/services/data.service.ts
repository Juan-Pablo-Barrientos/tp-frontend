import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  addUser(request: any): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(this.baseUrl + 'user', request);
  }

  getPostsByIdWithAuthor(idPost: number): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + 'posts/withAuthor/' + idPost);
  }
}
