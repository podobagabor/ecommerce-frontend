import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryServiceService} from "../../../api/services/category-service.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrl: './category-form.component.scss',
    standalone: false
})
export class CategoryFormComponent {

  protected categoryForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
  })

  constructor(private categoryService: CategoryServiceService, private router: Router, private snackService: MatSnackBar) {
  }


  createCategory() {
    this.categoryService.create2({
      body: {
        name: this.categoryForm.value.name!,
      }
    }).subscribe(_ => {
      this.snackService.open("Sikeres kategória létrehozás",undefined, {
        duration: 3000,
      })
      this.router.navigateByUrl('/admin/categoryList');
    })
  }
}
