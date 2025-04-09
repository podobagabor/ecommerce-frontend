import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderDto} from "../../../api/models/order-dto";
import {OrderControllerService} from "../../../api/services/order-controller.service";


@Component({
    selector: 'app-order-manage',
    templateUrl: './order-manage.component.html',
    styleUrl: './order-manage.component.scss',
    standalone: false
})
export class OrderManageComponent implements OnInit {
  //TODO ilyen még nincs
  protected orders: OrderDto[] = [];

  constructor(private orderService: OrderControllerService, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    this.orderService.getAllOrder().subscribe(value => {
      this.orders = value;
    })
  }

  statusChanged($event: Event, order: OrderDto) {
    $event.stopPropagation();
    this.orderService.changeOrderStatus({id: order.id!,
      status: order.status!
      }).subscribe( value => {
        this.snackService.open('Sikeres sátusz módosítás',undefined,{
          duration:2000,
        });
    })
  }
}
