import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {SavedActions} from "../../../store/saved-state/saved.actions";
import {ProductDto} from "../../../api/models/product-dto";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false
})
export class ProductCardComponent implements OnChanges, OnInit {

  @Input({required: true}) product?: ProductDto;
  @Input() hasUser: boolean = false;
  @Input() savedProducts: number[] = [];
  @Input() savedMode: boolean = false
  @Output() addSaved = new EventEmitter<number>();
  @Output() removeSaved = new EventEmitter<number>();
  protected isSaved: boolean = false

  constructor(private router: Router, private store: Store) {
  }

  ngOnInit() {
    if (this.savedMode) {
      this.isSaved = true;
    }
  }

  ngOnChanges(): void {
    if (this.savedProducts.length) {
      this.isSaved = this.savedProducts.some(id => this.product?.id === id)
    }
  }

  save(event: any) {
    event.stopPropagation();
    if (this.hasUser) {
      if (this.isSaved) {
        this.store.dispatch(SavedActions.removeProduct({productId: this.product?.id!}))
      } else {
        this.store.dispatch(SavedActions.addProduct({productId: this.product?.id!}))
      }

    } else {
      if (!this.isSaved) {
        this.addSaved.emit(this.product?.id);
      } else {
        this.removeSaved.emit(this.product?.id);
      }
    }
  }

  goDetail() {
    this.router.navigateByUrl('/product/' + this.product?.id);
  }
}
