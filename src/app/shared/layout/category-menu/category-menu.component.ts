import {Component, inject, Input} from '@angular/core';
import {CategoryDetailedDto} from "../../../api/models/category-detailed-dto";
import {CategoryStore} from "../../../store/category-signal-state/category.store";

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
  standalone: false
})
export class CategoryMenuComponent {
  readonly categoryStore = inject(CategoryStore);
  @Input({required: true}) categories?: CategoryDetailedDto[];
}
