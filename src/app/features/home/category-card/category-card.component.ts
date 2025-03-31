import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss'],
    standalone: false
})

export class CategoryCardComponent implements OnInit {

  //TODO: ide kell a categoria

  protected categoryName?: string;
  protected subCategories : string[] = [];
  ngOnInit(): void {
    this.categoryName = "Kategória neve";
    this.subCategories = ['Alkategória 1','Alkategória 2','Alkategória 3','Alkategória 4']
  }

}
