import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductResponse} from "../../../api/models/product-response";
import {UserServiceService} from "../../../api/services/user-service.service";
import {ProductServiceService} from "../../../api/services/product-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserResponse} from "../../../api/models/user-response";
import {Store} from "@ngrx/store";
import {savedProductsIDs, selectUser} from "../../../store/app.selectors";
import {SavedActions} from "../../../store/saved-state/saved.actions";
import {CartActions} from "../../../store/cart-state/cart.actions";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    standalone: false
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  protected product?: ProductResponse;
  protected isSaved: boolean = false;
  protected image: string = "";
  protected query: string = '';
  protected user?: UserResponse;
  protected _user = this.store.select(selectUser);
  protected _saved = this.store.select(savedProductsIDs);
  protected savedSubscription?: Subscription;
  protected userSubscription?: Subscription;

  constructor(private store: Store, private userService: UserServiceService, private productService: ProductServiceService, private activatedRoute: ActivatedRoute, private router: Router, private cookieService: CookieService, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    const q = localStorage.getItem('query');
    if (q) {
      localStorage.clear()
      this.query = q;
    }
    this.activatedRoute.params.subscribe(params => {
      const productId = params['productId'];
      if (productId) {
        this.productService.getById({id: productId}).subscribe(value => {
          this.savedSubscription?.unsubscribe();
          this.product = value;
          this.image = value.imageUrls?.[0] || '';
          this.savedSubscription = this._saved.subscribe(savedProducts => {
            this.isSaved = savedProducts.some(productId => productId === this.product?.id)
          })

        })
      }
    })
    this.userSubscription = this._user.subscribe(user => {
      this.user = user
    })
  }

  addToSaved() {
    if (this.user) {
      if (this.isSaved) {
        this.store.dispatch(SavedActions.removeProduct({productId: this.product?.id!}))
      } else {
        this.store.dispatch(SavedActions.addProduct({productId: this.product?.id!}))
      }
    } else {
      if (this.isSaved) {
        this.store.dispatch(SavedActions.removeProduct({productId: this.product?.id!}))
      } else {
        this.store.dispatch(SavedActions.addProduct({productId: this.product?.id!}))
      }
    }
  }

  addToCart() {
    if (!this.user) {
      this.snackService.open("Jelentkezz be először, vagy regisztálj.", "Értem", {
        duration: 3000,
      });
    } else {
      this.store.dispatch(CartActions.addProduct({product: this.product!}))
    }
  }

  showImage(image: string) {
    this.image = image;
  }

  ngOnDestroy(): void {
    this.savedSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe()
  }
}
