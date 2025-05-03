import {Component, effect, inject, OnDestroy, OnInit, untracked} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {savedProducts} from "../../../store/app.selectors";
import {Subscription} from "rxjs";
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

  protected _savedProducts = this.store.select(savedProducts)
  protected savedProducts: ProductDto[] = []
  protected price: { min: number, max: number } = {min: 0, max: 88888}
  protected discount: boolean = this.productStore.filter().discount || false;
  protected subscription?: Subscription;
  protected emptyCategory: boolean = false;

  constructor(private store: Store) {
    effect(() => {
      console.log("effect", this.categoryStore.mainCategory());
      untracked(() => {
        this.getProducts();
      });
    });
  }

  ngOnInit(): void {
    this.price = {
      min: this.productStore.filter().minPrice || 0,
      max: this.productStore.filter().maxPrice || 100000,
    }
    this.subscription?.add(this._savedProducts.subscribe(saved => {
      this.savedProducts = [...saved];
    }));
    if (!this.brandStore.brands().length) {
      this.brandStore.loadBrands("");
    }
  }

  getProducts() {
    this.productStore.updateFilters({
      maxPrice: this.price.max,
      minPrice: this.price.min,
      discount: this.discount,
    });
    this.productStore.loadProducts({
      brandId: this.brandStore.brands().filter(value => value.selected).map(brand => brand.brand.id),
      maxPrice: this.price.max,
      minPrice: this.price.min,
      discount: this.discount ? true : undefined,
      page: this.productStore.filter().page,
      size: this.productStore.filter().size,
      categoryId: this.categoryStore.categoryFilters(),
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  page($event: PageEvent) {

    this.productStore.updatePageValues({
      page: $event.pageIndex,
      size: $event.pageSize,
    })
    this.getProducts();
  }

  isSaved(product: ProductDto): boolean {
    return this.savedProducts.some(savedProduct => savedProduct.id === product.id);
  }
}
