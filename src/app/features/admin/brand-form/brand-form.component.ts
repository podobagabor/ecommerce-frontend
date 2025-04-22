import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BrandControllerService} from "../../../api/services/brand-controller.service";
import {catchError, of, take} from "rxjs";
import {BrandCreateDto} from "../../../api/models/brand-create-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {StoredFile} from "../product-form/product-form.component";
import {environment} from "../../../../environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-brand-form',
  standalone: false,
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent implements OnInit {

  protected displayedColumnsUploadedFiles = ["fileName", "actions"];
  protected uploadedFile: File[] = [];
  protected editedBrandId?: number = undefined;
  protected storedImages: StoredFile[] = [];

  protected brandForm = new FormGroup({
    brandName: new FormControl<string>("", Validators.required),
    brandDescription: new FormControl<string>("", Validators.required),
  });

  constructor(private brandService: BrandControllerService, private snackService: MatSnackBar, private router: Router, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      const brandId = params["brandId"];
      if (brandId) {
        this.editedBrandId = brandId;
        this.brandService.getBrandById({id: brandId}).pipe(take(1)).subscribe(brand => {
          this.brandForm.patchValue({
            brandDescription: brand.description,
            brandName: brand.name,
          });
          fetch(environment.backendUrl + brand.imageUrl).then(response => {
            response.blob().then(blob => {
              this.storedImages.push({
                deleted: false,
                url: brand.imageUrl,
                file: new File([blob], "brand-illustration.jpg"),
              });
            })
          })
        })
      }
    })
  }


  protected fileUpload($event: any) {
    if ($event.target.files && $event.target.files.length > 0) {
      if (this.editedBrandId) {
        this.storedImages.length = 0;
        this.storedImages.push({
          file: $event.target.files[0],
          url: undefined,
          deleted: true
        });
        this.storedImages = [...this.storedImages];
      } else {
        this.uploadedFile.length = 0;
        this.uploadedFile.push($event.target.files[0]);
        this.uploadedFile = [...this.uploadedFile];
      }
    }
  }

  protected deleteImage() {
    if (this.editedBrandId) {
      this.storedImages.length = 0;
    } else {
      this.uploadedFile.length = 0;
    }
  }

  protected downloadImage(element: File) {
    const fileName = element.name;
    const blob = new Blob([element]);
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  }

  protected createBrand() {
    if (this.brandForm.valid && this.uploadedFile.length > 0) {
      const newBrand: BrandCreateDto = {
        name: this.brandForm.value.brandName || "",
        description: this.brandForm.value.brandDescription || "",
      }
      this.brandService.createBrand({
        body: {
          brand: newBrand,
          image: this.uploadedFile[0]
        }
      }).pipe(take(1),
        catchError((err) => {
          this.snackService.open("Hiba történt", undefined, {
            duration: 3000,
          })
          return of(err.message as string);
        })).subscribe(value => {
        if (typeof value !== "string") {
          this.snackService.open("Sikeres létrehozás.", undefined, {
            duration: 3000,
          });
          this.router.navigateByUrl("admin/brandList");
        } else {
          console.error(value.toString());
        }
      })
    }
  }

  protected updateBrand() {
    if (this.brandForm.valid && this.storedImages.length > 0 && this.editedBrandId) {
      this.brandService.modifyBrand({
        body: {
          brand: {
            imageUrl: this.storedImages[0].url,
            name: this.brandForm.value.brandName || "",
            id: this.editedBrandId,
            description: this.brandForm.value.brandDescription || "",
          },
          newImage: this.storedImages[0].url!! ? undefined : this.storedImages[0].file,
        }
      }).pipe(take(1),
        catchError((err) => {
          this.snackService.open("Hiba történt", undefined, {
            duration: 3000,
          })
          return of(err.message as string);
        })
      ).subscribe(value => {
        if (typeof value !== "string") {
          this.snackService.open("Sikeres módosítás", undefined, {
            duration: 3000,
          });
          this.router.navigateByUrl("admin/brandList");
        } else {
          console.error(value.toString());
        }
      })
    }
  }

}
