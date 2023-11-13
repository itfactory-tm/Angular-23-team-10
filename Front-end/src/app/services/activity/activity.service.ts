import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Category } from 'src/app/models/api/category';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>("https://localhost:7113/api/Activities");
  }

  deleteCategory(id: number): Observable<Category> {
    return this.httpClient.delete<Category>("https://localhost:7113/api/Activities/" + id);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>("https://localhost:7113/api/Activities/" + id);
  }

  postCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>("https://localhost:7113/api/Activities", category);
  }

  putCategory(id: number, category: Category): Observable<void> {
    return this.httpClient.put<void>("https://localhost:7113/api/Activities/" + id, category);
  }
}
