import {Component, effect, inject, OnDestroy, OnInit, untracked} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {savedProducts} from "../../../../core/store/app.selectors";
import {Subscription} from "rxjs";
import {ProductStore} from "../../../../core/store/products-signal-state/products.store";
import {BrandStore} from "../../../../core/store/brand-signal-state/brand.store";
import {CategoryStore} from "../../../../core/store/category-signal-state/category.store";
import {ProductDto} from "../../../../api/models/product-dto";
import {FormControl, FormGroup} from "@angular/forms";

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
  protected subscription: Subscription = new Subscription();
  protected emptyCategory: boolean = false;
  protected basicFilterForm = new FormGroup({
    minPrice: new FormControl<number>(0),
    maxPrice: new FormControl<number>(0),
    discount: new FormControl<boolean>(false),
  })

  constructor(private store: Store) {
    effect(() => {
      console.log("effect", this.categoryStore.mainCategory());
      untracked(() => {
        this.getProducts();
      });
    });
    effect(() => {
      if (this.productStore.filter.discount !== undefined)
        this.basicFilterForm.controls.discount.patchValue(this.productStore.filter.discount() || false)
    });
  }

  ngOnInit(): void {
    this.basicFilterForm.patchValue({
      maxPrice: this.productStore.filter().maxPrice || 1000000,
      minPrice: this.productStore.filter().minPrice || 0,
      discount: this.productStore.filter().discount || false
    });
    this.basicFilterForm.controls.minPrice.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.productStore.updateFilters({minPrice: value});
      }
    });
    this.basicFilterForm.controls.maxPrice.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.productStore.updateFilters({maxPrice: value});
      }
    });
    this.basicFilterForm.controls.discount.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.productStore.updateFilters({discount: value});
      }
    });
    this.subscription.add(this._savedProducts.subscribe(saved => {
      this.savedProducts = [...saved];
    }));
    if (!this.brandStore.brands().length) {
      this.brandStore.loadBrands("");
    }
  }

  getProducts() {
    this.productStore.loadProducts({
      brandId: this.brandStore.brands().filter(value => value.selected).map(brand => brand.brand.id),
      maxPrice: this.price.max,
      minPrice: this.price.min,
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
