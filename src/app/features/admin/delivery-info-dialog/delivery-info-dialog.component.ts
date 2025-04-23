import {Component, Inject} from '@angular/core';
import {OrderDto} from "../../../api/models/order-dto";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-delivery-info-dialog',
  standalone: false,
  templateUrl: './delivery-info-dialog.component.html',
  styleUrl: './delivery-info-dialog.component.scss'
})
export class DeliveryInfoDialogComponent {
  protected order: OrderDto = {};

  constructor(@Inject(MAT_DIALOG_DATA) private data: {order: OrderDto}) {
    if(data && data.order) {
      this.order = data.order;
    }
  }

}
