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
  protected $savedItems = this.store.select(savedProducts)
  constructor(private store: Store, private savedService: SavedControllerService, private cookieService: CookieService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
