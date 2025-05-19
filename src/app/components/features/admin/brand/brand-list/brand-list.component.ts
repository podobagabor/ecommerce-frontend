import {Component, OnInit} from '@angular/core';
import {BrandDto} from "../../../../../api/models/brand-dto";
import {PageBrandDto} from "../../../../../api/models/page-brand-dto";
import {PageEvent} from "@angular/material/paginator";
import {BrandControllerService} from "../../../../../api/services/brand-controller.service";
import {take, tap} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-brand-list',
  standalone: false,
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.scss'
})
export class BrandListComponent implements OnInit {
  protected brands: PageBrandDto = {}
  protected displayedColumnsBrandList = ["name", "actions"];

  protected brandSearchForm = new FormGroup({
    name: new FormControl<string>("")
  })

  constructor(private brandService: BrandControllerService, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadBrandList()
  }

  loadBrandList() {
    this.brandService.getBrandPageable({
      size: this.brands.pageable?.pageSize,
      page: this.brands.pageable?.pageNumber,
      name: this.brandSearchForm.value.name || undefined,
    }).pipe(take(1)).subscribe(brands => {
      this.brands = brands;
    })
  }

  deleteBrand(element: BrandDto) {
    this.brandService.deleteBrand({id: element.id}).pipe(take(1),
      tap(() => {
        this.loadBrandList();
        this.snackService.open("Sikeres törlés.", undefined, {duration: 2000,});
      })
    ).subscribe()
  }

  page($event: PageEvent) {
    if (this.brands.pageable) {
      this.brands.pageable.pageNumber = $event.pageIndex;
      this.brands.pageable.pageSize = $event.pageSize;
      this.loadBrandList();
    }
  }
}
