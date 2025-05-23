import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryEditDialogComponent} from "../category-edit-dialog/category-edit-dialog.component";
import {CategoryDto} from "../../../../../api/models/category-dto";
import {CategoryControllerService} from "../../../../../api/services/category-controller.service";
import {catchError, of, take} from "rxjs";
import {CategoryDetailedDto} from "../../../../../api/models/category-detailed-dto";


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  standalone: false
})
export class CategoryListComponent implements OnInit {
  protected categories: CategoryDetailedDto[] = [];
  protected allCategory: CategoryDto[] = [];

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
      this.categories = [...categories];
    })
  }

  editCategory(category: CategoryDto, $event: any) {
    if (!this.allCategory.length) {
      this.loadAllCategory().then(_ => {
          this.openModalLogic(category, $event);
        }
      );
    } else {
      this.openModalLogic(category, $event);
    }
  }

  openModalLogic(category: CategoryDetailedDto, $event: any) {
    $event.stopPropagation();
    const ref = this.dialogService.open(CategoryEditDialogComponent, {
      data: {
        category: category,
        categories: this.allCategory.filter(categoryElement => {
          return (categoryElement.id !== category.id && categoryElement.parentCategoryId !== category.id && !this.isDescendant(categoryElement.id, category.id));
        }),
        parent: this.allCategory.find(categoryElement => categoryElement.subCategoryIds?.some(subCategoryId => subCategoryId === category.id)),
      }
    });
    ref.afterClosed().subscribe(value => {
      if (value) {
        this.updateCategories();
      }
    });
  }

  loadAllCategory(): Promise<CategoryDto[]> {
    return new Promise<any>((resolve, reject) => {
      this.categoryService.getCategoryCreateData().pipe(take(1),
        catchError(err => {
          reject(err)
          return of(err)
        })).subscribe(categories => {
        this.allCategory = [...categories?.parentCategories];
        resolve(categories);
      })
    })
  }

  isDescendant(currentCategoryId: number, targetCategoryId: number): boolean {
    if (currentCategoryId === targetCategoryId) {
      return true;
    }
    const currentCategory = this.allCategory.find((category) => category.id === currentCategoryId);
    if (!currentCategory || !currentCategory.parentCategoryId) {
      return false;
    }
    return this.isDescendant(currentCategory.parentCategoryId, targetCategoryId);
  }
}
