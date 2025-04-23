import {Component, OnInit} from '@angular/core';
import {CategoryControllerService} from "../../../api/services/category-controller.service";
import {take} from "rxjs";
import {CategoryDetailedDto} from "../../../api/models/category-detailed-dto";

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
  standalone: false
})
export class CategoryMenuComponent implements OnInit {

  protected categories: CategoryDetailedDto[] = [];

  constructor(private categoryService: CategoryControllerService) {
  }

  ngOnInit(): void {
    this.categoryService.getMainCategories().pipe(take(1)).subscribe(categories => {
      this.categories = categories;
    })
  }

}
