import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryDto} from "../../../api/models/category-dto";
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {CategoryControllerService} from "../../../api/services/category-controller.service";
import {BrandDto} from "../../../api/models/brand-dto";
import {ProductCreateDto} from "../../../api/models/product-create-dto";
import {catchError, of, take} from "rxjs";
import {BrandControllerService} from "../../../api/services/brand-controller.service";
import {environment} from "../../../../environment";
import {ProductModifyDto} from "../../../api/models/product-modify-dto";
import {ImageModifyDto} from "../../../api/models/image-modify-dto";
import {BrandSimpleDto} from "../../../api/models/brand-simple-dto";

export interface StoredFile {
  file: File;
  url?: string;
  deleted: boolean;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: false
})
export class ProductFormComponent implements OnInit {
  protected editingMode: boolean = false;
  protected productId?: number = undefined;
  protected displayedColumnsIllustration = ["fileName", "actions"];
  protected productForm = new FormGroup({
    productName: new FormControl<string>('', Validators.required),
    category: new FormControl<string | CategoryDto>('', Validators.required),
    price: new FormControl<number | undefined>(undefined, Validators.required),
    discount: new FormControl<number | undefined>(undefined),
    brand: new FormControl<string | BrandDto>('', Validators.required),
    quantity: new FormControl<number | undefined>(undefined, Validators.required),
    description: new FormControl<string>('', Validators.required),
  })
  protected illustrationImages: File[] = [];
  private _storedImages: StoredFile[] = [];
  protected get storedImages(): StoredFile[] {
    return this._storedImages.filter(image => !image.deleted)
  }

  protected categories: CategoryDto[] = [];
  protected filteredCategories: CategoryDto[] = [];
  protected brands: BrandSimpleDto[] = [];
  protected filteredBrands: BrandSimpleDto[] = [];

  constructor(private productService: ProductControllerService, private brandService: BrandControllerService, private snackService: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute, private categoryService: CategoryControllerService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const productId = params["productId"];
      if (productId) {
        this.productId = productId;
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
              brand: value.brand,
            });
          });
          const images: Promise<StoredFile>[] = value.images?.map((url, idx) => {
            return fetch(environment.backendUrl + url).then(res => res.blob().then(blob => {
              return {
                file: new File([blob], idx.toString() + ".image.jpg"),
                url: url,
                deleted: false,
              }
            }))
          }) || [];
          Promise.all(images).then(value => {
            this._storedImages = value;
          })
        })
      }
    })

    this.brandService.getBrands().pipe(take(1)).subscribe(brandsResponse => {
      this.brands = brandsResponse;
      this.filteredBrands = [...this.brands];
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

    this.productForm.controls.brand.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.filteredBrands = this.brands.filter(brand => brand.name?.toLowerCase().includes(value.toLowerCase()));
      }
    })
  }

  fileUpload($event: any) {
    let tempList: File[] = [...$event.target.files];
    tempList.forEach(element => {
      if (this.editingMode) {
        this._storedImages.push({
          file: element,
          url: undefined,
          deleted: false,
        })
      } else {
        this.illustrationImages.push(element);
      }
    });
    if (this.editingMode) this._storedImages = [...this.storedImages];
    else this.illustrationImages = [...this.illustrationImages];
  }

  displayObjectWithName(object: CategoryDto | BrandDto | string): string {
    if (typeof object === 'string') {
      return object;
    } else {
      return object.name!;
    }
  }


  updateProduct() {
    const images = this.processImages();
    console.log(images);
    if (this.productId) {
      const product: ProductModifyDto = {
        brandId: (this.productForm.value.brand as BrandDto).id,
        count: this.productForm.value.quantity || 0,
        name: this.productForm.value.productName || "",
        discountPercentage: this.productForm.value.discount || undefined,
        description: this.productForm.value.description!,
        price: this.productForm.value.price!,
        id: this.productId || 0,
        images: images.storedImages,
        categoryId: (this.productForm.value.category as CategoryDto).id,
      };
      console.log(product);
      console.log(images.newImages);
      this.productService.updateProduct({
        body: {
          newImages: images.newImages,
          productModifyDto: product
        }
      }).subscribe(value => {
        this.router.navigateByUrl("/admin/productList");
      })
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
      categoryId: (this.productForm.value.category as CategoryDto).id
    };
    this.productService.createProduct({
      body: {
        product: product,
        images: this.illustrationImages
      }
    }).pipe(
      catchError(err => {
        //TODO: státuszkód
        return of("Váratlan hiba történt: " + err.message);
      })
    ).subscribe(_ => {
      this.snackService.open("Sikeres termék létrehozás", undefined, {
        duration: 3000,
      });
      this.router.navigateByUrl("/admin/productList");
    })
  }

  deleteImage(element: File) {
    if (this.editingMode) {
      const imageElement = this._storedImages.find(value => value.file == element);
      if (imageElement) {
        imageElement.deleted = true;
      }
    }
    this.illustrationImages = this.illustrationImages.filter(image => image !== element)
  }

  processImages(): { storedImages: ImageModifyDto[], newImages: File[] } {
    let storedImages: ImageModifyDto[] = [];
    let newImages: File[] = [];
    this._storedImages.forEach(value => {
      if (!value.url) {
        newImages.push(value.file);
      } else {
        storedImages.push(value);
      }
    })
    return {
      storedImages: storedImages,
      newImages: newImages
    }
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
