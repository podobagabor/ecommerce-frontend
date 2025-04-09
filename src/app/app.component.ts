import {Component, OnDestroy, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthServiceService} from "./services/api/services/auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  protected name?: string;
  title = 'Nile';

  constructor(private authService: AuthServiceService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.cookieService.deleteAll();
  }
}
