import {Component, OnDestroy, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../../../services/authentication.service";
import {SavedActions} from "../../../store/saved-state/saved.actions";
import {Store} from "@ngrx/store";
import {savedProducts} from "../../../store/app.selectors";
import {Subscription} from "rxjs";
import {SavedControllerService} from "../../../api/services/saved-controller.service";
import {ProductDto} from "../../../api/models/product-dto";

@Component({
  selector: 'app-saved-products',
  templateUrl: './saved-products.component.html',
  styleUrl: './saved-products.component.scss',
  standalone: false
})
export class SavedProductsComponent implements OnInit, OnDestroy {
  protected savedItems: ProductDto[] = [];
  protected _savedItems = this.store.select(savedProducts)
  protected hasUser: boolean = false;
  protected subscription?: Subscription;

  constructor(private store: Store, private savedService: SavedControllerService, private cookieService: CookieService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.subscription = this._savedItems.subscribe(saved => {
      this.savedItems = saved
    })
    if (this.authenticationService.getCurrentUser().value) {
      this.savedService.getSavedOfUser().subscribe(value => {
        this.hasUser = true;
      })
    }
  }

  removeFromSaved($event: number) {
    this.store.dispatch(SavedActions.removeProduct({productId: $event}))
    //Todo
    /*
    if (this.hasUser) {
      this.savedService.removeProductFromSaved({body: [$event]})
    }

     */
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
