import {Component, inject, Input, OnInit} from '@angular/core';
import {CategoryControllerService} from "../../../api/services/category-controller.service";
import {CategoryDetailedDto} from "../../../api/models/category-detailed-dto";
import {ProductStore} from "../../../store/products-signal-state/products.store";

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
  standalone: false
})
export class CategoryMenuComponent {
  readonly productStore = inject(ProductStore);
  @Input({required: true}) categories?: CategoryDetailedDto[];
}
