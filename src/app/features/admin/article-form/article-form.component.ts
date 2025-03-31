import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductServiceService} from "../../../api/services/product-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ArticleServiceService} from "../../../api/services/article-service.service";

@Component({
    selector: 'app-article-form',
    templateUrl: './article-form.component.html',
    styleUrls: ['./article-form.component.scss'],
    standalone: false
})
export class ArticleFormComponent {
  protected articleForm = new FormGroup({
    buttonLink : new FormControl<string>('',Validators.required),
    buttonText : new FormControl<string>('',Validators.required),
    text : new FormControl<string>('',Validators.required),
    name : new FormControl<string>('',Validators.required),
  });
  protected illustrationImage?: File;

  constructor(private articleService: ArticleServiceService, private snackService: MatSnackBar, private router: Router) {
  }

  deleteImage() {
    this.illustrationImage = undefined;
  }

  fileUpload($event: any) {
    this.illustrationImage = $event.target.files[0];
    console.log(this.illustrationImage);
  }

  downloadImage() {
    if(this.illustrationImage) {
      const fileName = this.illustrationImage.name;
      const blob = new Blob([this.illustrationImage]);
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(blob);
      anchor.download = fileName;
      anchor.click();
      URL.revokeObjectURL(anchor.href);
    }
  }

  createArticle() {
    this.articleService.create3({body: {
      buttonLink: this.articleForm.value.buttonLink!,
        name: this.articleForm.value.name!,
        text: this.articleForm.value.text!,
        buttonText: this.articleForm.value.buttonText!,
        image: this.illustrationImage!,
      }}).subscribe( value => {
        this.router.navigateByUrl('/admin/dashboard');
    })

  }
}
