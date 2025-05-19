import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryControllerService} from "../../../../../api/services/category-controller.service";
import {CategoryDetailedDto} from "../../../../../api/models/category-detailed-dto";
import {CategoryDto} from "../../../../../api/models/category-dto";
import {catchError, EMPTY, take, tap} from "rxjs";

@Component({
  selector: 'app-category-edit-dialog',
  templateUrl: './category-edit-dialog.component.html',
  styleUrl: './category-edit-dialog.component.scss',
  standalone: false
})
export class CategoryEditDialogComponent {

  protected category?: CategoryDetailedDto;
  protected categories: CategoryDto[] = [];
  protected filteredCategories: CategoryDto[] = [];
  protected addingSubCategoryMode: boolean = false;
  protected categoryForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    parent: new FormControl<number | CategoryDto | undefined>(undefined),
  })

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private categoryService: CategoryControllerService, private snackService: MatSnackBar) {
    if (data.category) {
      this.category = data.category;
      this.categoryForm.controls.name.patchValue(data.category.name);
    }
    if (data.categories) {
      this.categories = [...data.categories];
      this.filteredCategories = [...data.categories];
    }
    if (data.parent) {
      this.categoryForm.controls.parent.patchValue(data.parent);
    }
  }

  saveCategory() {
    if (this.category) {
      this.categoryService.modifyCategory({
        body: {
          name: this.category?.name,
          id: this.category?.id,
          parentCategoryId: (this.categoryForm.value.parent as CategoryDto).id || undefined,
        }
      }).pipe(
        take(1),
        tap(() => {
          this.snackService.open("Sikeres kategória módosítás", undefined, {
            duration: 2000,
          });
        })).subscribe()
    }
  }

  displayCategory(category?: CategoryDto): string {
    return category?.name || "";
  }

  deleteCategory() {
    if (this.category) {
      this.categoryService.deleteCategory({id: this.category.id}).pipe(take(1),
        tap(() => {
          this.snackService.open("Sikeres törlés.", undefined, {duration: 2000,});
        }),
        catchError((err) => {
          return EMPTY;
        })
      ).subscribe()
    }
  }
}
