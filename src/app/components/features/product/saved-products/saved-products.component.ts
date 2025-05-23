import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {savedProducts} from "../../../../core/store/app.selectors";

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
