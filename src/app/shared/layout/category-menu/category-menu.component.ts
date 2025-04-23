import {Component, Input, OnInit} from '@angular/core';
import {CategoryControllerService} from "../../../api/services/category-controller.service";
import {CategoryDetailedDto} from "../../../api/models/category-detailed-dto";

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
  standalone: false
})
export class CategoryMenuComponent {
  @Input({required: true}) categories?: CategoryDetailedDto[];
}
