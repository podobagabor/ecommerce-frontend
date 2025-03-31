import {Component, OnInit} from '@angular/core';
import {OrderServiceService} from "../../../api/services/order-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderResponse} from "../../../api/models/order-response";
import {PageOrderResponse} from "../../../api/models/page-order-response";

@Component({
    selector: 'app-order-manage',
    templateUrl: './order-manage.component.html',
    styleUrl: './order-manage.component.scss',
    standalone: false
})
export class OrderManageComponent implements OnInit {
  protected orders: PageOrderResponse = {};

  constructor(private orderService: OrderServiceService, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    this.orderService.getAll1().subscribe(value => {
      this.orders = value;
    })
  }

  statusChanged($event: Event, order: OrderResponse) {
    $event.stopPropagation();
    this.orderService.changeOrderStatus({id: order.id!, body: {
      orderStatus: order.status!
      }}).subscribe( value => {
        this.snackService.open('Sikeres sátusz módosítás',undefined,{
          duration:2000,
        });
    })
  }
}
