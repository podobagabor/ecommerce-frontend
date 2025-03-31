import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductServiceService} from "../../../api/services/product-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductRequest} from "../../../api/models/product-request";
import {CategoryResponse} from "../../../api/models/category-response";
import {SubCategoryResponse} from "../../../api/models/sub-category-response";
import {CategoryServiceService} from "../../../api/services/category-service.service";
import {BrandResponse} from "../../../api/models/brand-response";

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
    standalone: false
})
export class ProductFormComponent implements OnInit {

  protected editingMode: boolean = false;
  protected id: string = "";
  protected displayedColumnsIllustration = ["fileName", "actions"];
  protected productForm = new FormGroup({
    productName: new FormControl<string>('', Validators.required),
    category: new FormControl<string | CategoryResponse>('', Validators.required),
    subCategory: new FormControl<string | SubCategoryResponse>('', Validators.required),
    price: new FormControl<number | undefined>(undefined, Validators.required),
    discount: new FormControl<number | undefined>(undefined, Validators.required),
    brand: new FormControl<string>('', Validators.required),
    quantity: new FormControl<number | undefined>(undefined, Validators.required),
    description: new FormControl<string>('', Validators.required),
    type: new FormControl<string>('', Validators.required),
  })
  protected illustrationImages: File[] = [];
  protected categories: CategoryResponse[] = [];
  protected filteredCategories: CategoryResponse[] = [];
  protected subCategories: SubCategoryResponse[] = [];
  protected filteredSubCategories: SubCategoryResponse[] = [];
  constructor(private productService: ProductServiceService, private snackService: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute, private categoryService: CategoryServiceService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const productId = params["productId"];
      if (productId) {
        this.id = productId;
        this.editingMode = true;
        this.productService.getById({id: productId}).subscribe(value => {
          this.categoryService.getAll2().subscribe( categories => {
            this.categories = categories;
            this.filteredCategories = categories;
            this.productForm.patchValue({
              type: value.type,
              subCategory: value.subCategory,
              price: value.price,
              description: value.description,
              discount: value.discountPercentage,
              productName: value.name,
              quantity: value.count,
              category: value.category,
              brand: value.brand?.name,
            });
          });
          const images: Promise<File>[] = value.imageUrls?.map((url, idx) => {
            return fetch(url).then(res => res.blob().then(blob => {
              return new File([blob], idx.toString() + ".image.jpg");
            }))
          }) || [];
          Promise.all(images).then(value => {
            this.illustrationImages = [...value];
          })
        })
      } else {
        this.productForm.controls.subCategory.disable();
      }
    })
    this.categoryService.getAll2().subscribe( value => {
      this.categories = value;
      this.filteredCategories = value;
    });
    this.productForm.controls.category.valueChanges.subscribe( value => {
      if(typeof value === 'string' ) {
        this.filteredCategories = this.categories.filter( category => category.name?.toLowerCase().includes(value.toLowerCase()));
        this.productForm.controls.subCategory.disable();
      } else {
        this.subCategories = value?.subCategories || [];
        this.filteredSubCategories = [...this.subCategories];
        this.productForm.controls.subCategory.enable();
      }
    });
    this.productForm.controls.subCategory.valueChanges.subscribe( value => {
      if(typeof value === 'string') {
        this.filteredSubCategories = this.subCategories.filter(subCat => subCat.name?.toLowerCase().includes(value.toLowerCase()));
      }
    })

  }

  fileUpload($event: any) {
    let tempList: File[] = [...$event.target.files];
    tempList.forEach(element => {
      this.illustrationImages.push(element);
    });
    this.illustrationImages = [...this.illustrationImages];
  }

  displayCategory(category: CategoryResponse | SubCategoryResponse | string): string {
    if(typeof category === 'string') {
      return category;
    } else {
      return category.name!;
    }
  }


  createProduct() {
    const product: ProductRequest = {
      brand: this.productForm.value.brand!,
      subCategoryId: (this.productForm.value.subCategory as SubCategoryResponse).id!,
      count: this.productForm.value.quantity!,
      name: this.productForm.value.productName!,
      discountPercentage: this.productForm.value.discount!,
      description: this.productForm.value.description!,
      images: this.illustrationImages,
      price: this.productForm.value.price!,
      type: this.productForm.value.type!,
    };
    console.log(product);
    if (this.editingMode) {
      this.productService.update({
        id: this.id, body: product
      }).subscribe(value => {
        this.router.navigateByUrl("/admin/productList");
      })
    } else {
      this.productService.create({
        body: product
      }).pipe(
        catchError(err => {
          //TODO: státuszkód
          if (err.error.error[0].ReasonStatus === 4016) {
            return of("Hiba a létrehozás során.")
          } else {
            return of("Váratlan hiba történt.")
          }
        })
      ).subscribe(value => {
        this.snackService.open("Sikeres termék létrehozás", undefined, {
          duration: 3000,
        });
        this.router.navigateByUrl("/admin/productList");
      })
    }
  }

  deleteImage(element: File) {
    this.illustrationImages = this.illustrationImages.filter(image => image !== element)
  }

  downloadImage(element: File) {
    const fileName = element.name;
    const blob = new Blob([element]);
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  }
}
