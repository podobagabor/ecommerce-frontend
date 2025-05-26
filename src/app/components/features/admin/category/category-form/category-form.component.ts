import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryControllerService} from "../../../../../api/services/category-controller.service";
import {CategoryDto} from "../../../../../api/models/category-dto";
import {Subject, take, takeUntil} from "rxjs";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
  standalone: false
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  protected availableParentCategories: CategoryDto[] = [];
  protected filteredParentCategories: CategoryDto[] = [];

  protected categoryForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    parentCategory: new FormControl<CategoryDto | string>('', isObjectValidator),
  })

  constructor(private categoryService: CategoryControllerService, private router: Router, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    this.categoryService.getCategoryCreateData().pipe(take(1)).subscribe(data => {
      this.availableParentCategories = data.parentCategories || [];
      this.filteredParentCategories = [...this.availableParentCategories];
    })

    this.categoryForm.controls.parentCategory.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      if (value && typeof value === 'string') {
        this.filteredParentCategories = [...this.availableParentCategories.filter(c => c.name.toLowerCase().includes(value.toLowerCase()))];
      } else {
        this.filteredParentCategories = [...this.availableParentCategories];
      }
    })
  }

  createCategory() {
    if (this.categoryForm.valid && this.categoryForm.value.name) {
      this.categoryService.createCategory({
        body: {
          name: this.categoryForm.value.name,
          parentCategoryId: (this.categoryForm.value.parentCategory) ? (this.categoryForm.value.parentCategory as CategoryDto).id : undefined,
        }
      }).subscribe(_ => {
        this.snackService.open("Sikeres kategória létrehozás", undefined, {
          duration: 3000,
        })
        this.router.navigateByUrl('/admin/categoryList');
      })
    }
  }

  displayCategory(category: CategoryDto): string {
    return category.name || "";
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

export function isObjectValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null
  const result = typeof control.value === "object";
  return result ? null : {notObject: true};
}
