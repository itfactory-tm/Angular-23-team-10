import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Category } from 'src/app/models/api/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>("https://localhost:7113/api/Categories");
  }

  deleteCategory(id: number): Observable<Category> {
    return this.httpClient.delete<Category>("https://localhost:7113/api/Categories/" + id);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>("https://localhost:7113/api/Categories/" + id);
  }

  postCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>("https://localhost:7113/api/Categories", category);
  }

  putCategory(id: number, category: Category): Observable<void> {
    return this.httpClient.put<void>("https://localhost:7113/api/Categories/" + id, category);
  }
}
