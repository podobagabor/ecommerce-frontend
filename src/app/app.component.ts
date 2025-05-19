import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Store} from "@ngrx/store";
import {UserActions} from "./core/store/user-state/user.actions";
import {ProductStore} from "./core/store/products-signal-state/products.store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  readonly productStore = inject(ProductStore);

  protected name?: string;
  title = 'Nile';

  constructor(private cookieService: CookieService, private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.init());
  }

  ngOnDestroy(): void {
    this.cookieService.deleteAll();
  }
}
