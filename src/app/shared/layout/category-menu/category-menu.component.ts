import {Component, OnInit} from '@angular/core';
import {CategoryServiceService} from "../../../api/services/category-service.service";
import {CategoryResponse} from "../../../api/models/category-response";

@Component({
    selector: 'app-category-menu',
    templateUrl: './category-menu.component.html',
    styleUrls: ['./category-menu.component.scss'],
    standalone: false
})
export class CategoryMenuComponent implements OnInit{

  protected categories: CategoryResponse[] = [];
  constructor(private categoryService: CategoryServiceService){}
  ngOnInit(): void {
    this.categoryService.getAll2().subscribe( value => {
      this.categories = value;
    })
  }

}
