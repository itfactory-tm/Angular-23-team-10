import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/api/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { Subscription } from 'rxjs';
import { PageLoaderComponent } from '../page-loader/page-loader.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, PageLoaderComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categories$: Subscription = new Subscription();
  deleteCategory$: Subscription = new Subscription();

  errorMessage: string = "";
  isLoading: boolean = true;

  constructor(private categoryService: CategoryService, private router: Router){}

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.categories$.unsubscribe();
    this.deleteCategory$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/category/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/category/form'], {state: { id: id, mode: 'edit' }});
  }

  delete(id: number) {
    this.deleteCategory$ = this.categoryService.deleteCategory(id).subscribe({
      next: (v) => this.getCategories(),
      error: (e) => this.errorMessage = e.message
    });
  }

  getCategories() {
    this.isLoading = true;
    this.categories$ = this.categoryService.getCategories().subscribe(result => {this.categories = result; this.isLoading = false;});
  }
}
