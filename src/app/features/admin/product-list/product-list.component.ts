import {Component, OnInit} from '@angular/core';
import {ProductResponse} from "../../../api/models/product-response";
import {ProductServiceService} from "../../../api/services/product-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageProductResponse} from "../../../api/models/page-product-response";
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    standalone: false
})
export class ProductListComponent implements OnInit{
  protected products: PageProductResponse = {};
  protected displayedColumnsProduct = ["category","subCategory","brand","name","quantity","price","discount","actions"];
  constructor(private productService: ProductServiceService, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    this.updateList();
  }
  deleteProduct(element: ProductResponse) {
    this.productService.delete({id: element.id!}).subscribe( value => {
      this.snackService.open("Sikeres törlés.",undefined,{
        duration: 3000
      });
      this.updateList();

    })
  }
  updateList() {
    this.productService.getAll({size: this.products.size,
    page: this.products.size}).subscribe( products => {
      this.products = products;
    })
  }

  page($event: PageEvent) {
    this.products.pageable!.pageNumber = $event.pageIndex;
    this.products.pageable!.pageSize = $event.pageSize;
    this.updateList();
  }
}
