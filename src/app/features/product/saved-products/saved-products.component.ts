import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserServiceService} from "../../../api/services/user-service.service";
import {ProductResponse} from "../../../api/models/product-response";
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../../../services/authentication.service";
import {SavedActions} from "../../../store/saved-state/saved.actions";
import {Store} from "@ngrx/store";
import {savedProducts} from "../../../store/app.selectors";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-saved-products',
    templateUrl: './saved-products.component.html',
    styleUrl: './saved-products.component.scss',
    standalone: false
})
export class SavedProductsComponent implements OnInit, OnDestroy {
  protected savedItems: ProductResponse[] = [];
  protected _savedItems = this.store.select(savedProducts)
  protected hasUser: boolean = false;
  protected subscription?: Subscription;

  constructor(private store: Store, private userService: UserServiceService, private cookieService: CookieService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.subscription = this._savedItems.subscribe(saved => {
      this.savedItems = saved
    })
    if (this.authenticationService.getCurrentUser().value) {
      this.userService.getSaved().subscribe(value => {
        this.hasUser = true;
      })
    }
  }

  removeFromSaved($event: string) {
    this.store.dispatch(SavedActions.removeProduct({productId: $event}))
    if (this.hasUser) {
      this.userService.removeSaved({body: [$event]})
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
