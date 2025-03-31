import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductServiceService} from "../../../api/services/product-service.service";
import {UserServiceService} from "../../../api/services/user-service.service";
import {CookieService} from "ngx-cookie-service";
import {SubCategoryResponse} from "../../../api/models/sub-category-response";
import {CategoryServiceService} from "../../../api/services/category-service.service";
import {ActivatedRoute} from "@angular/router";
import {CategoryResponse} from "../../../api/models/category-response";
import {PageProductResponse} from "../../../api/models/page-product-response";
import {PageEvent} from "@angular/material/paginator";
import {BrandResponse} from "../../../api/models/brand-response";
import {Store} from "@ngrx/store";
import {savedProductsIDs, selectUser} from "../../../store/app.selectors";
import {SavedActions} from "../../../store/saved-state/saved.actions";
import {ProductsActions} from "../../../store/products-state/products.actions";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
    standalone: false
})
export class ProductsListComponent implements OnInit, OnDestroy {

  protected products: PageProductResponse = {};
  protected _savedProducts = this.store.select(savedProductsIDs)
  protected savedProducts: string[] = []
  protected currentUser = this.store.select(selectUser)
  protected hasUser: boolean = false;
  protected brands: { brand: BrandResponse, selected: boolean }[] = [];
  protected categories: { category: SubCategoryResponse, selected: boolean }[] = [];
  protected price: { min: number, max: number } = {min: 0, max: 120000};
  protected discount: { min: number, max: number } = {min: 0, max: 100};
  protected category?: CategoryResponse;
  protected subscription?: Subscription;

  constructor(private store: Store, private productService: ProductServiceService, private userService: UserServiceService, private cookieService: CookieService, private categoryService: CategoryServiceService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let userSubscription = this.currentUser.subscribe(user => {
      this.hasUser = !!user;
    })
    let savedSubscription = this._savedProducts.subscribe(saved => {
      this.savedProducts = saved
    })
    this.subscription?.add(userSubscription);
    this.subscription?.add(savedSubscription)
    this.activatedRoute.queryParams.subscribe(params => {
      const category = params['category'];
      const subcategory = params['subCategory'];
      if (category) {
        localStorage.setItem('query', category);
        this.categoryService.getAll2().subscribe(value => {
          let categoryItem: CategoryResponse | undefined = value.find(cat => cat.name === category);
          if (categoryItem) {
            this.category = categoryItem;
            this.categories = categoryItem.subCategories?.map(subCat => {
              return {
                category: subCat!,
                selected: false,
              };
            }) || [];
          }
          if (subcategory) {
            let currentCat = this.categories.find(subcat => subcat.category.name === subcategory);
            if (currentCat) {
              currentCat.selected = true;
            }
          }
          this.getProducts();
        })
      }
    })
    this.productService.getBrands().subscribe(value => {
      this.brands = value.map(brand => {
        return {
          brand: brand,
          selected: false,
        };
      });
    })
  }

  getProducts() {
    this.productService.getAll({
      categories: [this.category?.name!],
      brands: this.brands.filter(brand => brand.selected).map(brand => brand.brand.name!),
      maxPrice: this.price.max,
      minPrice: this.price.min,
      subCategories: this.categories.filter(cat => cat.selected).map(cat => cat.category.name!),
      minDiscountPercentage: this.discount.min,
      maxDiscountPercentage: this.discount.max,
      page: this.products.number,
      size: this.products.size,
    }).subscribe(products => {
      this.products = products;
      this.store.dispatch(ProductsActions.loadProducts({products: products.content || []}))
    })
  }


  addToSaved($event: string) {
    this.store.dispatch(SavedActions.addProduct({productId: $event}))
  }

  removeFromSaved($event: string) {
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
