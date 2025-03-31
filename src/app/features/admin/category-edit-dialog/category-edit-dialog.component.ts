import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CategoryResponse} from "../../../api/models/category-response";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryServiceService} from "../../../api/services/category-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-category-edit-dialog',
    templateUrl: './category-edit-dialog.component.html',
    styleUrl: './category-edit-dialog.component.scss',
    standalone: false
})
export class CategoryEditDialogComponent {

  protected category?: CategoryResponse;
  protected addingSubCategoryMode: boolean = false;
  protected categoryForm = new FormGroup({
    name: new FormControl<string>('',Validators.required),
  })

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private categoryService: CategoryServiceService, private snackService: MatSnackBar) {
    const category = data.category;
    const addingMode = data.addSubCategory;
    if(addingMode) {
      this.addingSubCategoryMode = addingMode;
    }
    if (category) {
      this.category = category;
      if(!this.addingSubCategoryMode) {
        this.categoryForm.controls.name.patchValue(category.name);
      }
    }
  }

  saveCategory() {
    if(this.addingSubCategoryMode) {
      this.categoryService.addSubCategory({id: this.category?.id!, body: {
        name: this.categoryForm.value.name!,
        }}).subscribe( _ => {
          this.snackService.open("Sikeres alkategória hozzáadás", undefined, {
            duration: 2000,
          });
      })
    } else {
      this.categoryService.update1({id: this.category?.id!, body: {
        name: this.categoryForm.value.name!,
        }}).subscribe( _ => {
        this.snackService.open("Sikeres módosítás", undefined, {
          duration: 2000,
        });
      })
    }
  }
}
