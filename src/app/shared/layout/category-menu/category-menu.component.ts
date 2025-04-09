import {Component, OnInit} from '@angular/core';
import {CategoryResponse} from "../../../services/api/models/category-response";
import {CategoryControllerService} from "../../../api/services/category-controller.service";

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
  standalone: false
})
export class CategoryMenuComponent implements OnInit {

  protected categories: CategoryResponse[] = [];

  constructor(private categoryService: CategoryControllerService) {
  }

  ngOnInit(): void {
    //todo

    /*
    this.categoryService.getAll2().subscribe( value => {
      this.categories = value;
    })

     */
  }

}
