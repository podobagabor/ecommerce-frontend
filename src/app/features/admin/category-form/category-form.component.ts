import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryControllerService} from "../../../api/services/category-controller.service";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {CategoryDto} from "../../../api/models/category-dto";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {take} from "rxjs";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
  standalone: false
})
export class CategoryFormComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  protected categories: CategoryDto[] = [];
  protected filteredCategories: CategoryDto[] = [];
  protected parentCategories: CategoryDto[] = [];
  protected filteredParentCategories: CategoryDto[] = [];
  protected subCategories: CategoryDto[] = [];
  protected categoryError: boolean = false;
  protected categoryForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    parentCategory: new FormControl<CategoryDto | string>('', isObjectValidator),
    subCategory: new FormControl<CategoryDto | string>(''),
  })


  constructor(private categoryService: CategoryControllerService, private router: Router, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().pipe(take(1)).subscribe(response => {
      this.categories = response;
      this.filteredCategories = [...this.categories];

      this.parentCategories = response;
      this.filteredParentCategories = [...this.parentCategories];
    })
    this.categoryForm.controls.subCategory.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.filteredCategories = [...this.categories.filter(c => c.name!!.toLowerCase().includes(value.toLowerCase()))];
      }
    })

    this.categoryForm.controls.parentCategory.valueChanges.subscribe(value => {
      if (value && typeof value === 'string') {
        this.filteredParentCategories = [...this.parentCategories.filter(c => c.name!!.toLowerCase().includes(value.toLowerCase()))];
        this.categoryError = false;
      } else {
        this.validateForm(value as CategoryDto);
        this.filteredParentCategories = [...this.parentCategories];
      }
    })
  }

  createCategory() {
    this.categoryService.createCategory({
      body: {
        name: this.categoryForm.value.name!,
        parentCategoryId: (this.categoryForm.value.parentCategory) ? (this.categoryForm.value.parentCategory as CategoryDto).id : undefined,
        subCategoryIds: this.subCategories.map(c => c.id!),
      }
    }).subscribe(_ => {
      this.snackService.open("Sikeres kategória létrehozás", undefined, {
        duration: 3000,
      })
      this.router.navigateByUrl('/admin/categoryList');
    })
  }

  remove(category: CategoryDto) {
    this.subCategories = [...this.subCategories.filter(c => c.id !== category.id)];
    this.validateForm();
  }

  selected($event: MatAutocompleteSelectedEvent) {
    if (!this.subCategories.includes($event.option.value as CategoryDto)) {
      this.subCategories.push($event.option.value as CategoryDto);
      this.validateForm();
    }
  }

  displayCategory(category: CategoryDto): string {
    return category.name || "";
  }

  validateForm(category?: CategoryDto) {
    if (category) {
      this.categoryError = !!(this.subCategories.length && this.subCategories.some(subCat => subCat.id === category.id));
    } else {
      this.categoryError = !!(this.categoryForm.value.parentCategory && (typeof this.categoryForm.value.parentCategory === "object") && this.subCategories.length && this.subCategories.some(subCat => subCat.id === (this.categoryForm.value.parentCategory as CategoryDto).id));
    }
  }
}

export function isObjectValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null
  const result = typeof control.value === "object";
  return result ? null : {notObject: true};
}
