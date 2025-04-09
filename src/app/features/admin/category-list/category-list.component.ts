import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryEditDialogComponent} from "../category-edit-dialog/category-edit-dialog.component";
import {TorlesDialogComponent} from "../../../core/torles-dialog/torles-dialog.component";
import {CategoryDto} from "../../../api/models/category-dto";
import {CategoryControllerService} from "../../../api/services/category-controller.service";


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    standalone: false
})
export class CategoryListComponent implements OnInit {
  protected categories: CategoryDto[] = [];

  constructor(private categoryService: CategoryControllerService, private dialogService: MatDialog, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
   this.updateCategories();
  }

  updateCategories() {
    //todo

    /*
    this.categoryService.getAll2().subscribe(categories => {
      this.categories = categories;
    })

     */
  }

  deleteCategory(category: CategoryDto) {
    const ref = this.dialogService.open(TorlesDialogComponent);
    ref.afterClosed().subscribe( value => {
      if(value) {
        /*

        this.categoryService.delete1({id: category.id!}).subscribe(_ => {
          this.snackService.open("Sikeres törlés.", undefined, {
            duration: 2000,
          });
          this.updateCategories();
        })
        */

      }
    })
  }

  editCategory(category: CategoryDto) {
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

  addSubcategory(category: CategoryDto) {
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
//todo oo
  deleteSubCategory(subCategory: CategoryDto) {
    const ref = this.dialogService.open(TorlesDialogComponent);
    ref.afterClosed().subscribe( value => {
      if(value) {

        /*


        this.categoryService.deleteSubCategory({id:subCategory.id!}).subscribe( _ => {
          this.snackService.open("Sikeres törlés", undefined, {
            duration: 2000,
          });
          this.updateCategories();
        });
        */
      }


    });
  }
}
