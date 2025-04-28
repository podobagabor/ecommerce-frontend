import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {savedProductsIDs, selectUser} from "../../../store/app.selectors";
import {SavedActions} from "../../../store/saved-state/saved.actions";
import {Subscription} from "rxjs";
import {PageProductDto} from "../../../api/models/page-product-dto";
import {ActivatedRoute} from "@angular/router";
import {CategoryControllerService} from "../../../api/services/category-controller.service";
import {CategoryDetailedDto} from "../../../api/models/category-detailed-dto";
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {BrandControllerService} from "../../../api/services/brand-controller.service";
import {ProductStore} from "../../../store/products-signal-state/products.store";
import {BrandStore} from "../../../store/brand-signal-state/brand.store";
import {CategoryStore} from "../../../store/category-state/category.store";

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
  protected _savedProducts = this.store.select(savedProductsIDs)
  protected savedProducts: number[] = []
  protected currentUser = this.store.select(selectUser)
  protected hasUser: boolean = false;
  protected categories: {
    category: CategoryDetailedDto,
    selected: boolean,
    subCategories: { category: CategoryDetailedDto, selected: boolean }[]
  }[] = [];
  protected price: { min: number, max: number } = {min: 0, max: 120000};
  protected discount: boolean = false;
  protected category?: CategoryDetailedDto;
  protected subscription?: Subscription;
  protected emptyCategory: boolean = false;

  constructor(private brandService: BrandControllerService, private productService: ProductControllerService, private store: Store, private activatedRoute: ActivatedRoute, private categoryService: CategoryControllerService) {
  }

  ngOnInit(): void {
    let userSubscription = this.currentUser.subscribe(user => {
      this.hasUser = !!user;
    })
    let savedSubscription = this._savedProducts.subscribe(saved => {
      this.savedProducts = [...saved]
    })
    this.subscription?.add(userSubscription);
    this.subscription?.add(savedSubscription);
    if (!this.brandStore.brands().length) {
      this.brandStore.loadBrands("");
    }
    this.getProducts();
  }

  getProducts() {
    console.log("brand");
    console.log(this.brandStore.brands().filter(value => value.selected).map(brand => brand.brand.id));
    console.log("category");
    console.log(this.categoryStore.categoryFilters());
    this.productStore.loadProducts({
      brandId: this.brandStore.brands().filter(value => value.selected).map(brand => brand.brand.id),
      maxPrice: this.price.max,
      minPrice: this.price.min,
      discount: this.discount ? true : undefined,
      page: this.products.number,
      size: this.products.size,
      categoryId: this.categoryStore.categoryFilters(),
    })
  }


  addToSaved($event: number) {
    this.store.dispatch(SavedActions.addProduct({productId: $event}))
  }

  removeFromSaved($event: number) {
    this.store.dispatch(SavedActions.removeProduct({productId: $event}))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  page($event: PageEvent) {
    this.products.pageable!.pageNumber = $event.pageIndex;
    this.products.pageable!.pageSize = $event.pageSize;
    this.getProducts();
  }
}
