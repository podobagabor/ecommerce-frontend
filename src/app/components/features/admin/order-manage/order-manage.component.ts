import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderDto} from "../../../../api/models/order-dto";
import {OrderControllerService} from "../../../../api/services/order-controller.service";
import {PageOrderDto} from "../../../../api/models/page-order-dto";
import {FormControl, FormGroup} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DeliveryInfoDialogComponent} from "../delivery-info-dialog/delivery-info-dialog.component";
import {environment} from "../../../../../environment";


@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrl: './order-manage.component.scss',
  standalone: false
})
export class OrderManageComponent implements OnInit {
  protected orders: PageOrderDto = {};
  protected orderSearchForm = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    status: new FormControl<"CREATED" | "IN_PROGRESS" | "UNDER_DELIVERY" | "COMPLETED" | undefined>(undefined),
    dateStart: new FormControl<Date | undefined>(undefined),
    dateEnd: new FormControl<Date | undefined>(undefined),
  });

  constructor(private orderService: OrderControllerService, private snackService: MatSnackBar, private dialogService: MatDialog) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrderListPage({
      page: this.orders.pageable?.pageNumber,
      size: this.orders.pageable?.pageSize,
      status: this.orderSearchForm.value.status || undefined,
      id: this.orderSearchForm.value.id || undefined,
      after: this.orderSearchForm.value.dateStart?.toISOString().split('.')[0] || undefined,
      before: this.orderSearchForm.value.dateEnd?.toISOString().split('.')[0] || undefined,
    }).subscribe(value => {
      this.orders = value;
    })
  }

  statusChanged($event: Event, order: OrderDto) {
    $event.stopPropagation();
    this.orderService.changeOrderStatus({
      id: order.id,
      status: order.status
    }).subscribe(_ => {
      this.snackService.open('Sikeres sátusz módosítás', undefined, {
        duration: 2000,
      });
    })
  }

  getTotalPrice(order: OrderDto): number {
    let total = 0;
    order.items?.forEach((item) => {
      if (item.quantity && item.product && item.product.price) {
        total += item.quantity * item.product?.price;
      }
    })
    return total;
  }

  showDeliveryInfo(order: OrderDto, $event: any) {
    $event.stopPropagation();
    this.dialogService.open(DeliveryInfoDialogComponent, {
      data: {
        order: order,
      }
    });
  }

  page($event: PageEvent) {
    if (this.orders.pageable) {
      this.orders.pageable.pageSize = $event.pageSize;
      this.orders.pageable.pageNumber = $event.pageIndex;
      this.loadOrders();
    }
  }

  protected readonly environment = environment;
}
