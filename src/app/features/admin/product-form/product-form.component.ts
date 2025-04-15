import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryDto} from "../../../api/models/category-dto";
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {CategoryControllerService} from "../../../api/services/category-controller.service";
import {BrandDto} from "../../../api/models/brand-dto";
import {ProductDto} from "../../../api/models/product-dto";
import {ProductCreateDto} from "../../../api/models/product-create-dto";

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
    category: new FormControl<string | CategoryDto>('', Validators.required),
    price: new FormControl<number | undefined>(undefined, Validators.required),
    discount: new FormControl<number | undefined>(undefined, Validators.required),
    brand: new FormControl<string | BrandDto>('', Validators.required),
    quantity: new FormControl<number | undefined>(undefined, Validators.required),
    description: new FormControl<string>('', Validators.required),
    type: new FormControl<string>('', Validators.required),
  })
  protected illustrationImages: File[] = [];
  protected categories: CategoryDto[] = [];
  protected filteredCategories: CategoryDto[] = [];
  protected subCategories: CategoryDto[] = [];
  protected filteredSubCategories: CategoryDto[] = [];

  constructor(private productService: ProductControllerService, private snackService: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute, private categoryService: CategoryControllerService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const productId = params["productId"];
      if (productId) {
        this.id = productId;
        this.editingMode = true;
        this.productService.getProductById({id: productId}).subscribe(value => {
          this.categoryService.getAllCategories().subscribe(categories => {
            this.categories = categories;
            this.filteredCategories = categories;
            this.productForm.patchValue({
              price: value.price,
              description: value.description,
              discount: value.discountPercentage,
              productName: value.name,
              quantity: value.count,
              category: value.category,
              brand: value.brand?.name,
            });
          });
          const images: Promise<File>[] = value.images?.map((url, idx) => {
            return fetch(url).then(res => res.blob().then(blob => {
              return new File([blob], idx.toString() + ".image.jpg");
            }))
          }) || [];
          Promise.all(images).then(value => {
            this.illustrationImages = [...value];
          })
        })
      }
    })

    this.categoryService.getAllCategories().subscribe(value => {
      this.categories = value;
      this.filteredCategories = value;
    });

    this.productForm.controls.category.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.filteredCategories = this.categories.filter(category => category.name?.toLowerCase().includes(value.toLowerCase()));
      } else {
        this.filteredCategories = [...this.categories];
      }
    });
  }

  fileUpload($event: any) {
    let tempList: File[] = [...$event.target.files];
    tempList.forEach(element => {
      this.illustrationImages.push(element);
    });
    this.illustrationImages = [...this.illustrationImages];
  }

  displayCategory(category: CategoryDto | CategoryDto | string): string {
    if (typeof category === 'string') {
      return category;
    } else {
      return category.name!;
    }
  }


  createProduct() {
    const product: ProductCreateDto = {
      brandId: (this.productForm.value.brand as BrandDto).id,
      count: this.productForm.value.quantity || 0,
      name: this.productForm.value.productName || "",
      discountPercentage: this.productForm.value.discount || undefined,
      description: this.productForm.value.description!,
      price: this.productForm.value.price!,
    };
    if (this.editingMode) {
      this.productService.({
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
