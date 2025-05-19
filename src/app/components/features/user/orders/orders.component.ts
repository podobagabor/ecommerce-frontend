import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {Subscription} from "rxjs";
import {OrderDto} from "../../../../api/models/order-dto";
import {OrderControllerService} from "../../../../api/services/order-controller.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  standalone: false
})
export class OrdersComponent implements OnInit, OnDestroy {
  protected orders: OrderDto[] = [];
  protected subscription?: Subscription;

  constructor(private orderService: OrderControllerService, private snackService: MatSnackBar, private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    //todo

    /*
    if(this.authenticationService.getCurrentUser().value) {
      this.orders = this.authenticationService.getCurrentUser().value? || [];
    }
    this.subscription = this.authenticationService.getCurrentUser().subscribe( value => {
      this.orders = value?.orders || [];
    });

     */
  }

  getStatus(status: 'CREATED' | 'PAYED' | 'PACKAGED' | 'SHIPPING' | 'SHIPPED' | 'FINISHED' | 'WAITING_FOR_REFUND' | 'CANCELLED'): string {
    switch (status) {
      case "CANCELLED":
        return 'Lemondva';
      case "CREATED":
        return 'Létrehozva';
      case "FINISHED":
        return 'Teljesítve';
      case "PACKAGED":
        return 'Csomagolva';
      case "PAYED":
        return 'Fizetve';
      case "SHIPPED":
        return 'Kiszállítva';
      case "SHIPPING":
        return 'Szállítás alatt';
      case "WAITING_FOR_REFUND":
        return 'Viszzatérítés alatt';
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  cancel(order: OrderDto, $event: any) {
    $event.stopPropagation();

    //TODO

    /*
    this.orderService.cancel({id: order.id!}).subscribe( _ => {
        this.snackService.open('Sikeresen elküldtük a lemondást.');
    })

     */
  }
}
