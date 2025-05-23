import {Component, input, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {SavedActions} from "../../../../core/store/saved-state/saved.actions";
import {ProductDto} from "../../../../api/models/product-dto";
import {environment} from "../../../../../environment";

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    standalone: false
})
export class ProductCardComponent implements OnInit {

    product = input.required<ProductDto>()
    @Input() isSaved: boolean = false;
    @Input() savedMode: boolean = false

    constructor(private router: Router, private store: Store) {
    }

    ngOnInit() {
        if (this.savedMode) {
            this.isSaved = true;
        }
    }

    save(event: any) {
        event.stopPropagation();
        if (this.product) {
            if (this.isSaved) {
                this.store.dispatch(SavedActions.deleteProduct({productId: this.product().id!}));
            } else {
                this.store.dispatch(SavedActions.saveProduct({product: this.product()}));
            }
        }
    }

    goDetail() {
        this.router.navigateByUrl('/product/' + this.product().id);
    }

    protected readonly environment = environment;
}
