import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/api/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { createFirstCapitalLetterValidator } from 'src/app/validators/first-capital-letter-validator';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  categoryId: number = 0;

  category: Category = {categoryId: 0, name: "", description: ""}

  isSubmitted: boolean = false;
  errorMessage: string = "";

  category$: Subscription = new Subscription();
  postCategory$: Subscription = new Subscription();
  putCategory$: Subscription = new Subscription();

  categoryform = new FormGroup({
    CategoryId: new FormControl(0),
    Name: new FormControl('', [Validators.required, createFirstCapitalLetterValidator()]),
    Description: new FormControl('', [Validators.required, createFirstCapitalLetterValidator()])
  });

  constructor(private router: Router, private categoryService: CategoryService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.categoryId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (!this.categoryId != null && this.categoryId > 0) {
      this.category$ = this.categoryService.getCategoryById(this.categoryId).subscribe(result => {
        this.categoryform.setValue({
          CategoryId: this.categoryId,
          Name: result.name,
          Description: result.description
        });
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
    this.postCategory$.unsubscribe();
    this.putCategory$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postCategory$ = this.categoryService.postCategory(this.categoryform.value as Category).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/category"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      this.putCategory$ = this.categoryService.putCategory(this.categoryId, this.categoryform.value as Category).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/category"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
