import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {SavedActions} from "../../../../core/store/saved-state/saved.actions";
import {CartActions} from "../../../../core/store/cart-state/cart.actions";
import {Subscription} from "rxjs";
import {UserDtoDetailed} from "../../../../api/models/user-dto-detailed";
import {ProductDto} from "../../../../api/models/product-dto";
import {ProductControllerService} from "../../../../api/services/product-controller.service";
import {environment} from "../../../../../environment";
import {savedProducts, selectUser} from "../../../../core/store/app.selectors";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: false
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  protected product?: ProductDto;
  protected isSaved: boolean = false;
  protected image: string = "";
  protected query: string = '';
  protected user?: UserDtoDetailed;
  private $user = this.store.select(selectUser);
  private $saved = this.store.select(savedProducts);
  protected savedSubscription?: Subscription;
  protected userSubscription?: Subscription;
  protected readonly environment = environment;

  constructor(private store: Store, private productService: ProductControllerService, private activatedRoute: ActivatedRoute, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const productId = params['productId'];
      if (productId) {
        this.productService.getProductById({id: productId}).subscribe(value => {
          this.savedSubscription?.unsubscribe();
          this.product = value;
          this.image = value.images?.[0] || '';
          this.savedSubscription = this.$saved.subscribe(savedProducts => {
            this.isSaved = savedProducts.some(savedProduct => savedProduct.id === this.product?.id)
          })
        })
      }
    })
    this.userSubscription = this.$user.subscribe(user => {
      this.user = user
    })
  }

  addToSaved() {
    if (this.product) {
      if (this.isSaved) {
        this.store.dispatch(SavedActions.removeProduct({productId: this.product?.id!}))
      } else {
        this.store.dispatch(SavedActions.saveProduct({product: this.product}))
      }
    }
  }

  addToCart() {
    if (!this.user) {
      this.snackService.open("Jelentkezz be először, vagy regisztálj.", "Értem", {
        duration: 3000,
      });
    } else {
      if (this.product) {
        this.store.dispatch(CartActions.saveCartElement({product: this.product}))
        this.snackService.open("Sikeresen hozzáadtad a kosárhoz.", undefined, {
          duration: 3000,
        })
      }
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
