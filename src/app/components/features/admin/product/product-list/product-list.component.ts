import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";
import {PageProductDto} from "../../../../../api/models/page-product-dto";
import {ProductControllerService} from "../../../../../api/services/product-controller.service";
import {ProductDto} from "../../../../../api/models/product-dto";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: false
})
export class ProductListComponent implements OnInit {
  protected products: PageProductDto = {};
  protected displayedColumnsProduct = ["category", "brand", "name", "quantity", "price", "discount", "actions"];

  constructor(private productService: ProductControllerService, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    this.updateList();
  }

  deleteProduct(element: ProductDto) {
    this.productService.deleteProduct({id: element.id}).subscribe(value => {
      this.snackService.open("Sikeres törlés.", undefined, {
        duration: 3000
      });
      this.updateList();

    })
  }

  updateList() {
    this.productService.getProductsByParams({
      size: this.products.pageable?.pageSize,
      page: this.products.pageable?.pageNumber
    }).subscribe(products => {
      this.products = products;
    })
  }

  page($event: PageEvent) {
    if (this.products.pageable) {
      this.products.pageable.pageNumber = $event.pageIndex;
      this.products.pageable.pageSize = $event.pageSize;
      this.updateList();
    }
  }
}
