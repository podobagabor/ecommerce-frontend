import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserServiceService} from "../../../api/services/user-service.service";
import {CartItemResponse} from "../../../api/models/cart-item-response";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserResponse} from "../../../api/models/user-response";
import {Subscription} from "rxjs";
import {OrderServiceService} from "../../../api/services/order-service.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {cartProducts, selectUser} from "../../../store/app.selectors";
import {CartActions} from "../../../store/cart-state/cart.actions";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    standalone: false
})
export class CartComponent implements OnInit, OnDestroy {
  protected cartItems: CartItemResponse[] = [];
  protected _cartItems = this.store.select(cartProducts)
  protected currentUser?: UserResponse;
  protected _currentUser = this.store.select(selectUser)
  protected canOrder: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store, private userService: UserServiceService, private authenticationService: AuthenticationService, private orderService: OrderServiceService, private router: Router, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    const cartSubscription = this._cartItems.subscribe(cartItems => {
      this.cartItems = []
      cartItems.forEach(item => {
        this.cartItems.push({...item})
      })
    })
    const userSubscription = this._currentUser.subscribe(user => {
      this.currentUser = user;
      this.canOrder = !!(this.currentUser?.shippingAddress && this.currentUser.billingAddress);
    })
    this.subscriptions.add(cartSubscription)
    this.subscriptions.add(userSubscription)
  }


  reduce(item: CartItemResponse) {
    item.count = item.count! - 1;
    this.store.dispatch(CartActions.removeProduct({productId: item.product?.id!}))
  }

  grow(item: CartItemResponse) {
    item.count = item.count! + 1;
    this.store.dispatch(CartActions.addProduct({product: item.product!}))
  }

  getSum(): number {
    let sum = 0;
    this.cartItems.forEach(item => {
      sum = sum + item.count! * item.product?.price!;
    })
    return sum;
  }

  order() {
    this.orderService.create1().subscribe(value => {
      this.snackService.open('Sikeres megrendelés', undefined, {
        duration: 3000,
      });
      this.router.navigateByUrl('');
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
