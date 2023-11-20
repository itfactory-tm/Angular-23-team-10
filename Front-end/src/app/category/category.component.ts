import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/api/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { Subscription } from 'rxjs';
import { PageLoaderComponent } from '../page-loader/page-loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { CategoryFormComponent } from './category-form/category-form.component';
import { ToastComponent } from '../toast/toast.component';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-category-list',
    standalone: true,
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css'],
    imports: [
        CommonModule,
        PageLoaderComponent,
        FontAwesomeModule,
        CategoryFormComponent,
        ToastComponent,
        SidebarComponent
    ]
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categories$: Subscription = new Subscription();
  deleteCategory$: Subscription = new Subscription();

  errorMessage: string = '';
  isLoading: boolean = true;
  faChevron = faChevronDown;

  currentSort: string = 'id';
  isModalOpen: boolean = false;
  mode: string = 'add';
  categoryId: number = 0;
  isSubmitted: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.categories$.unsubscribe();
    this.deleteCategory$.unsubscribe();
  }

  delete(id: number) {
    this.deleteCategory$ = this.categoryService.deleteCategory(id).subscribe({
      next: (v) => this.getCategories(),
      error: (e) => (this.errorMessage = e.message),
    });
    this.mode = 'delete';
  }

  getCategories() {
    this.isLoading = true;
    this.categories$ = this.categoryService
      .getCategories()
      .subscribe((result) => {
        (this.categories = result), (this.isLoading = false);
      });
  }

  sort(filter: string) {
    if (filter !== this.currentSort) {
      this.currentSort = filter;
    }
    this.categories$ = this.categoryService
      .getCategories()
      .subscribe((result) => {
        if (filter == 'name') {
          this.categories = result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filter == 'description') {
          this.categories = result.sort((a, b) =>
            a.description.localeCompare(b.description)
          );
        } else {
          this.categories = result.sort();
        }
        this.isLoading = false;
      });
  }

  openModal(mode: string, id: number) {
    this.isSubmitted = false;
    this.mode = mode;
    if (id !== 0) {
      this.categoryId = id;
    }
    this.isModalOpen = true;
  }

  onUpdateOrCreate() {
    this.isSubmitted = true;
    this.getCategories();
  }
}
