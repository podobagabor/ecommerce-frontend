import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";
import {PageProductDto} from "../../../../../api/models/page-product-dto";
import {ProductControllerService} from "../../../../../api/services/product-controller.service";
import {ProductDto} from "../../../../../api/models/product-dto";
import {FormControl, FormGroup} from "@angular/forms";
import {CategoryBasicDto} from "../../../../../api/models/category-basic-dto";
import {CategoryControllerService} from "../../../../../api/services/category-controller.service";
import {CategoryDto} from "../../../../../api/models/category-dto";
import {Subject, take, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: false
})
export class ProductListComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  protected products: PageProductDto = {};
  protected categories: CategoryDto[] = [];
  protected filteredCategories: CategoryDto[] = [];
  protected displayedColumnsProduct = ["identifier", "category", "brand", "name", "quantity", "price", "discount", "actions"];
  protected productSearchForm = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    status: new FormControl<boolean | undefined>(undefined),
    maxQuantity: new FormControl<number | undefined>(undefined),
    category: new FormControl<CategoryBasicDto | undefined | string>(undefined),
  });

  constructor(private categoryService: CategoryControllerService, private productService: ProductControllerService, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    this.updateList();
    this.categoryService.getAllCategories().pipe(
      take(1),
      tap(categories => {
        this.categories = categories;
        this.filteredCategories = [...this.categories];
      }),
    ).subscribe();
    this.productSearchForm.controls.category.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      if (value) {
        if (typeof value === "string") {
          this.filteredCategories = [...this.categories.filter(category => category.name.toLowerCase().includes(value.toLowerCase()))];
        }
      } else {
        this.filteredCategories = [...this.categories]
      }
    })
  }

  deleteProduct(element: ProductDto) {
    this.productService.deleteProduct({id: element.id}).subscribe(_ => {
      this.snackService.open("Sikeres törlés.", undefined, {
        duration: 3000
      });
      this.updateList();

    })
  }

  updateList() {
    this.productService.getProductsByParams({
      categoryId: (this.productSearchForm.controls.category.value!! && typeof this.productSearchForm.controls.category.value === "object") ? [(this.productSearchForm.controls.category.value as CategoryDto).id] : undefined,
      id: this.productSearchForm.value.id!! ? this.productSearchForm.value.id : undefined,
      size: this.products.pageable?.pageSize,
      page: this.products.pageable?.pageNumber,
      maxQuantity: this.productSearchForm.value.maxQuantity ? this.productSearchForm.value.maxQuantity : undefined,
      isActive: this.productSearchForm.value.status !== null ? this.productSearchForm.value.status : undefined,
    }).subscribe(products => {
      this.products = products;
    })
  }

  page($event: PageEvent) {
    if (this.products.pageable) {
      this.products.pageable.pageNumber = $event.pageIndex;
      this.products.pageable.pageSize = $event.pageSize;
      this.updateList();
    }
  }

  displayCategory(category: CategoryDto | string | undefined): string {
    if (category) {
      return (typeof category === "string") ? category : category.name;
    } else {
      return "";
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
