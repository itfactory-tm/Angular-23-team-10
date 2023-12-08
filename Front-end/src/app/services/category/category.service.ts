import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Category } from 'src/app/models/Category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(environment.api_url + "/Categories");
  }

  deleteCategory(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(environment.api_url + "/Categories/" + id);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(environment.api_url + "/Categories/" + id);
  }

  postCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(environment.api_url + "/Categories/create", category);
  }

  putCategory(id: number, category: Category): Observable<void> {
    return this.httpClient.put<void>(environment.api_url + "/Categories/" + id, category);
  }
}
