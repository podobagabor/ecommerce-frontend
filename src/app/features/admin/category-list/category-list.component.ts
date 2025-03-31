import {Component, OnInit} from '@angular/core';
import {CategoryServiceService} from "../../../api/services/category-service.service";
import {CategoryResponse} from "../../../api/models/category-response";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryEditDialogComponent} from "../category-edit-dialog/category-edit-dialog.component";
import {SubCategoryResponse} from "../../../api/models/sub-category-response";
import {TorlesDialogComponent} from "../../../core/torles-dialog/torles-dialog.component";

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    standalone: false
})
export class CategoryListComponent implements OnInit {
  protected categories: CategoryResponse[] = [];

  constructor(private categoryService: CategoryServiceService, private dialogService: MatDialog, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
   this.updateCategories();
  }

  updateCategories() {
    this.categoryService.getAll2().subscribe(categories => {
      this.categories = categories;
    })
  }

  deleteCategory(category: CategoryResponse) {
    const ref = this.dialogService.open(TorlesDialogComponent);
    ref.afterClosed().subscribe( value => {
      if(value) {
        this.categoryService.delete1({id: category.id!}).subscribe(_ => {
          this.snackService.open("Sikeres törlés.", undefined, {
            duration: 2000,
          });
          this.updateCategories();
        })
      }
    })
  }

  editCategory(category: CategoryResponse) {
    const ref = this.dialogService.open(CategoryEditDialogComponent, {
      data: {
        category: category,
        addSubCategory: false,
      }
    });
    ref.afterClosed().subscribe( value => {
      if(value) {
        this.updateCategories();
      }
    })
  }

  addSubcategory(category: CategoryResponse) {
    const ref = this.dialogService.open(CategoryEditDialogComponent, {
      data: {
        category: category,
        addSubCategory: true,
      }
    });
    ref.afterClosed().subscribe( value => {
      if(value) {
        this.updateCategories();
      }
    });
  }

  deleteSubCategory(subCategory: SubCategoryResponse) {
    const ref = this.dialogService.open(TorlesDialogComponent);
    ref.afterClosed().subscribe( value => {
      if(value) {
        this.categoryService.deleteSubCategory({id:subCategory.id!}).subscribe( _ => {
          this.snackService.open("Sikeres törlés", undefined, {
            duration: 2000,
          });
          this.updateCategories();
        });
      }
    });
  }
}
