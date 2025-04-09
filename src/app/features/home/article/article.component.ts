import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ArticleResponse} from "../../../services/api/models/article-response";
import {ArticleServiceService} from "../../../services/api/services/article-service.service";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    standalone: false
})
export class ArticleComponent implements OnInit, OnDestroy {
  protected articles: ArticleResponse[] = [];
  protected numberOfImage: number = 0;
  protected forward: boolean = true;
  protected internal: any;

  constructor(private articleService: ArticleServiceService) {
  }

  ngOnInit(): void {
    this.articleService.getAll3().subscribe(value => {
      this.articles = value;
      this.internal = setInterval(() => this.changeArticle(),4000);
    })
  }

  left() {
    if (this.numberOfImage > 0) {
      this.numberOfImage = this.numberOfImage - 1;
    }
  }

  right() {
    if (this.numberOfImage < this.articles.length -1) {
      this.numberOfImage = this.numberOfImage + 1;
    }
  }

  changeArticle() {
    if(this.numberOfImage !== (this.articles.length -1) && this.forward) {
      this.right();
    } else if(this.numberOfImage === (this.articles.length -1) && this.forward) {
      this.left();
      this.forward = false;
    } else if(this.numberOfImage !== 0 && !this.forward) {
      this.left();
    } else {
      this.right();
      this.forward = true;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.internal);
  }
}
