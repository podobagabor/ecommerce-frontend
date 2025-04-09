import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {cartProducts, selectUser} from "../../../store/app.selectors";
import {CartActions} from "../../../store/cart-state/cart.actions";
import {UserDtoDetailed} from "../../../api/models/user-dto-detailed";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {CartElementDto} from "../../../api/models/cart-element-dto";
import {OrderControllerService} from "../../../api/services/order-controller.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false
})
export class CartComponent implements OnInit, OnDestroy {
  protected cartItems: CartElementDto[] = [];
  protected _cartItems = this.store.select(cartProducts)
  protected currentUser?: UserDtoDetailed;
  protected _currentUser = this.store.select(selectUser)
  protected canOrder: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store, private userService: UserControllerService, private authenticationService: AuthenticationService, private orderService: OrderControllerService, private router: Router, private snackService: MatSnackBar) {
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
      //TODO
      //this.canOrder = !!(this.currentUser?.shippingAddress && this.currentUser.billingAddress);
    })
    this.subscriptions.add(cartSubscription)
    this.subscriptions.add(userSubscription)
  }


  reduce(item: CartElementDto) {
    item.quantity = item.quantity! - 1;
    this.store.dispatch(CartActions.removeProduct({productId: item.productDto?.id!}))
  }

  grow(item: CartElementDto) {
    item.quantity = item.quantity! + 1;
    this.store.dispatch(CartActions.addProduct({product: item.productDto!}))
  }

  getSum(): number {
    let sum = 0;
    this.cartItems.forEach(item => {
      sum = sum + item.quantity! * item.productDto?.price!;
    })
    return sum;
  }

  order() {
    //Todo
    /*
    this.orderService.createOrder().subscribe(value => {
      this.snackService.open('Sikeres megrendelés', undefined, {
        duration: 3000,
      });
      this.router.navigateByUrl('');
    })

     */
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
