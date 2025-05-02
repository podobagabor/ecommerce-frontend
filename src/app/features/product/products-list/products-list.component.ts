import {Component, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {savedProducts} from "../../../store/app.selectors";
import {Subscription} from "rxjs";
import {PageProductDto} from "../../../api/models/page-product-dto";
import {CategoryDetailedDto} from "../../../api/models/category-detailed-dto";
import {ProductStore} from "../../../store/products-signal-state/products.store";
import {BrandStore} from "../../../store/brand-signal-state/brand.store";
import {CategoryStore} from "../../../store/category-state/category.store";
import {ProductDto} from "../../../api/models/product-dto";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  standalone: false
})
export class ProductsListComponent implements OnInit, OnDestroy {
  readonly productStore = inject(ProductStore);
  readonly brandStore = inject(BrandStore);
  readonly categoryStore = inject(CategoryStore);

  protected products: PageProductDto = {};
  protected _savedProducts = this.store.select(savedProducts)
  protected savedProducts: ProductDto[] = []
  protected price: { min: number, max: number } = {min: 0, max: 120000};
  protected discount: boolean = false;
  protected category?: CategoryDetailedDto;
  protected subscription?: Subscription;
  protected emptyCategory: boolean = false;

  constructor(private store: Store) {
    effect(() => {
      this.productStore.loadProducts({
        brandId: this.brandStore.brands().filter(value => value.selected).map(brand => brand.brand.id),
        maxPrice: this.price.max,
        minPrice: this.price.min,
        discount: this.discount ? true : undefined,
        page: this.productStore.products().number,
        size: this.products.size,
        categoryId: this.categoryStore.categoryFilters(),
      })
    });
  }

  ngOnInit(): void {
    let savedSubscription = this._savedProducts.subscribe(saved => {
      this.savedProducts = [...saved];
    })
    if (!this.brandStore.brands().length) {
      this.brandStore.loadBrands("");
    }
    this.getProducts();
  }

  getProducts() {
    this.productStore.loadProducts({
      brandId: this.brandStore.brands().filter(value => value.selected).map(brand => brand.brand.id),
      maxPrice: this.price.max,
      minPrice: this.price.min,
      discount: this.discount ? true : undefined,
      page: this.productStore.products().number,
      size: this.products.size,
      categoryId: this.categoryStore.categoryFilters(),
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  page($event: PageEvent) {
    this.products.pageable!.pageNumber = $event.pageIndex;
    this.products.pageable!.pageSize = $event.pageSize;
    this.getProducts();
  }

  isSaved(product: ProductDto): boolean {
    return this.savedProducts.some(savedProduct => savedProduct.id === product.id);
  }
}
