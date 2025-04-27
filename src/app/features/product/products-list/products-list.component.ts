import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {savedProductsIDs, selectUser} from "../../../store/app.selectors";
import {SavedActions} from "../../../store/saved-state/saved.actions";
import {Subscription, take} from "rxjs";
import {PageProductDto} from "../../../api/models/page-product-dto";
import {ActivatedRoute} from "@angular/router";
import {CategoryControllerService} from "../../../api/services/category-controller.service";
import {CategoryDetailedDto} from "../../../api/models/category-detailed-dto";
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {ProductsActions} from "../../../store/products-state/products.actions";
import {BrandControllerService} from "../../../api/services/brand-controller.service";
import {BrandSimpleDto} from "../../../api/models/brand-simple-dto";

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
  protected brands: { brand: BrandSimpleDto, selected: boolean }[] = [];
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
      console.log("Products list:" + saved);
      this.savedProducts = [...saved]
    })
    this.subscription?.add(userSubscription);
    this.subscription?.add(savedSubscription)

    this.activatedRoute.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        localStorage.setItem('query', categoryId);
        this.categoryService.getCategoryDetailedById({id: categoryId}).pipe(take(1)).subscribe(value => {
          this.category = value;
          if (!value.subCategories) {
            this.emptyCategory = true;
          }
          this.categories = value.subCategories?.map((subCat: CategoryDetailedDto) => {
            return {
              category: subCat,
              selected: false,
              subCategories: subCat.subCategories?.map(category => {
                return {
                  category: category,
                  selected: false,
                }
              }) || [],
            };
          }) || [];
          this.getProducts();
        })
      }
    })

    this.brandService.getBrands().subscribe(value => {
      this.brands = value.map(brand => {
        return {
          brand: brand,
          selected: false,
        };
      });
    })
  }

  getProducts() {
    const selectedCategories = this.getAllSelectedCategories();
    this.productService.getProductsByParams({
      categoryId: selectedCategories.length!! ? selectedCategories : this.getAllCategories(this.category),
      brandId: this.brands.filter(value => value.selected).map(brand => brand.brand.id),
      maxPrice: this.price.max,
      minPrice: this.price.min,
      discount: this.discount ? true : undefined,
      page: this.products.number,
      size: this.products.size,
    }).subscribe(products => {
      this.products = products;
      this.store.dispatch(ProductsActions.loadProducts({products: products.content || []}))
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

  getAllCategories(category: CategoryDetailedDto | undefined): number[] {
    let categoryIds: number[] = [];
    if (category) {
      categoryIds.push(category.id);
      category.subCategories?.forEach(value => {
        categoryIds = categoryIds.concat(this.getAllCategories(value));
      })
    }
    return categoryIds;
  }

  getAllSelectedCategories(): number[] {
    let categoryIds: number[] = [];
    this.categories.forEach(category => {
      if (category.selected) {
        categoryIds.push(category.category.id);
      }
      category.subCategories?.forEach(value => {
        if (value.selected) {
          categoryIds.push(value.category.id);
        }
      })
    })
    return categoryIds;
  }
}
