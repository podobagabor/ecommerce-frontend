import {Component, OnDestroy, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {SavedActions} from "../../../../core/store/saved-state/saved.actions";
import {Store} from "@ngrx/store";
import {savedProducts} from "../../../../core/store/app.selectors";
import {Subscription} from "rxjs";
import {SavedControllerService} from "../../../../api/services/saved-controller.service";
import {ProductDto} from "../../../../api/models/product-dto";

@Component({
  selector: 'app-saved-products',
  templateUrl: './saved-products.component.html',
  styleUrl: './saved-products.component.scss',
  standalone: false
})
export class SavedProductsComponent {
  protected $savedItems = this.store.select(savedProducts)
  constructor(private store: Store,) {
  }
}
