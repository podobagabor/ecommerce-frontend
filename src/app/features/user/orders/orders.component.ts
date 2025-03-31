import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderResponse} from "../../../api/models/order-response";
import {OrderServiceService} from "../../../api/services/order-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss',
    standalone: false
})
export class OrdersComponent implements OnInit, OnDestroy{
  protected orders: OrderResponse[] = [];
  protected subscription?: Subscription;
  constructor(private orderService: OrderServiceService, private snackService: MatSnackBar,private router: Router, private authenticationService: AuthenticationService) {
  }
  ngOnInit(): void {
    if(this.authenticationService.getCurrentUser().value) {
      this.orders = this.authenticationService.getCurrentUser().value?.orders || [];
    }
    this.subscription = this.authenticationService.getCurrentUser().subscribe( value => {
      this.orders = value?.orders || [];
    });
  }

  getStatus(status: 'CREATED' | 'PAYED' | 'PACKAGED' | 'SHIPPING' | 'SHIPPED' | 'FINISHED' | 'WAITING_FOR_REFUND' | 'CANCELLED'): string {
    switch (status) {
      case "CANCELLED": return 'Lemondva';
      case "CREATED": return 'Létrehozva';
      case "FINISHED":return 'Teljesítve';
      case "PACKAGED": return 'Csomagolva';
      case "PAYED": return 'Fizetve';
      case "SHIPPED":return 'Kiszállítva';
      case "SHIPPING":return 'Szállítás alatt';
      case "WAITING_FOR_REFUND":return 'Viszzatérítés alatt';
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  cancel(order: OrderResponse,$event: any) {
    $event.stopPropagation();
    this.orderService.cancel({id: order.id!}).subscribe( _ => {
        this.snackService.open('Sikeresen elküldtük a lemondást.');
    })
  }
}
