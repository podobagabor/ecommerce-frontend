import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {savedProductsIDs, selectUser} from "../../../store/app.selectors";
import {SavedActions} from "../../../store/saved-state/saved.actions";
import {Subscription} from "rxjs";
import {PageProductDto} from "../../../api/models/page-product-dto";
import {BrandDto} from "../../../api/models/brand-dto";
import {CategoryDto} from "../../../api/models/category-dto";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  standalone: false
})
export class ProductsListComponent implements OnInit, OnDestroy {

  protected products: PageProductDto = {};
  protected _savedProducts = this.store.select(savedProductsIDs)
  protected savedProducts: number[] = []
  protected currentUser = this.store.select(selectUser)
  protected hasUser: boolean = false;
  protected brands: { brand: BrandDto, selected: boolean }[] = [];
  protected categories: { category: CategoryDto, selected: boolean }[] = [];
  protected price: { min: number, max: number } = {min: 0, max: 120000};
  protected discount: { min: number, max: number } = {min: 0, max: 100};
  protected category?: CategoryDto;
  protected subscription?: Subscription;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    //todo
    /*
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
     */
  }

  getProducts() {
    /*
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

     */
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
