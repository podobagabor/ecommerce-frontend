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
import {environment} from "../../../../environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Address} from "../../../api/models/address";

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
  protected billingAddressIsTheSame: boolean = false;
  private subscriptions: Subscription = new Subscription();
  protected userShippingAddressForm = new FormGroup({
    country: new FormControl<string>('', Validators.required),
    zipCode: new FormControl<string | undefined>(undefined, Validators.required),
    city: new FormControl<string>('', Validators.required),
    street: new FormControl<string>('', Validators.required),
    streetNumber: new FormControl<string | undefined>(undefined, Validators.required),
    floor: new FormControl<string>(''),
  })
  protected userBillingAddressForm = new FormGroup({
    country: new FormControl<string>('', Validators.required),
    zipCode: new FormControl<string | undefined>(undefined, Validators.required),
    city: new FormControl<string>('', Validators.required),
    street: new FormControl<string>('', Validators.required),
    streetNumber: new FormControl<string | undefined>(undefined, Validators.required),
    floor: new FormControl<string>(''),
  })

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
      if (this.currentUser && this.currentUser.address) {
        this.userShippingAddressForm.patchValue({
          city: this.currentUser.address.city || '',
          street: this.currentUser.address.street || '',
          zipCode: this.currentUser.address.postalCode || '',
          streetNumber: this.currentUser.address.number || '',
          country: this.currentUser.address.country || '',
        });
      }
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
    if (this.currentUser) {
      let shippingAddress: Address = {
        country: this.userShippingAddressForm.value.country || "",
        number: this.userShippingAddressForm.value.streetNumber || "",
        street: this.userShippingAddressForm.value.street || "",
        city: this.userShippingAddressForm.value.city || "",
        postalCode: this.userShippingAddressForm.value.zipCode || "",
      };
      let billingAddress: Address = {...shippingAddress};
      if (!this.billingAddressIsTheSame) {
        billingAddress = {
          country: this.userBillingAddressForm.value.country || "",
          number: this.userBillingAddressForm.value.streetNumber || "",
          street: this.userBillingAddressForm.value.street || "",
          city: this.userBillingAddressForm.value.city || "",
          postalCode: this.userBillingAddressForm.value.zipCode || "",
        }
      }
      this.orderService.createOrder({
        body: {
          billingAddress: billingAddress,
          shippingAddress: shippingAddress,
        }
      }).subscribe(value => {
        this.snackService.open('Sikeres megrendelés', undefined, {
          duration: 3000,
        });
        this.router.navigateByUrl('/home');
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected readonly environment = environment;
}
