import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryEditDialogComponent} from "../category-edit-dialog/category-edit-dialog.component";
import {TorlesDialogComponent} from "../../../core/torles-dialog/torles-dialog.component";
import {CategoryDto} from "../../../api/models/category-dto";
import {CategoryControllerService} from "../../../api/services/category-controller.service";
import {take} from "rxjs";
import {CategoryDetailedDto} from "../../../api/models/category-detailed-dto";


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    standalone: false
})
export class CategoryListComponent implements OnInit {
  protected categories: CategoryDetailedDto[] = [];

  constructor(private categoryService: CategoryControllerService, private dialogService: MatDialog, private snackService: MatSnackBar) {
  }

  childrenAccessor = (node: CategoryDetailedDto) => node.subCategories ?? [];

  hasChild = (_: number, node: CategoryDetailedDto) => !!node.subCategories && node.subCategories.length > 0;


  ngOnInit(): void {
   this.updateCategories();
  }

  updateCategories() {
    this.categoryService.getMainCategories().pipe(
      take(1)
    ).subscribe(categories => {
      this.categories = categories;
    })
  }

  deleteCategory(category: CategoryDto) {
    const ref = this.dialogService.open(TorlesDialogComponent);
    ref.afterClosed().subscribe( value => {
      if(value) {
        this.categoryService.deleteCategory({id: category.id!}).pipe(take(1)).subscribe(_ => {
          this.snackService.open("Sikeres törlés.", undefined, {
            duration: 2000,
          });
          this.updateCategories();
        })
      }
    })
  }

  editCategory(category: CategoryDto, $event: any) {
    $event.stopPropagation();
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

  deleteSubCategory(subCategory: CategoryDto) {
    const ref = this.dialogService.open(TorlesDialogComponent);
    ref.afterClosed().subscribe( value => {
      if(value) {
        this.categoryService.deleteCategory({id:subCategory.id!}).pipe(
          take(1)
        ).subscribe( _ => {
          this.snackService.open("Sikeres törlés", undefined, {
            duration: 2000,
          });
          this.updateCategories();
        });
      }
    });
  }
}
