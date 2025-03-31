import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthServiceService} from "./api/services/auth-service.service";
import {CookieService} from "ngx-cookie-service";
import {UserServiceService} from "./api/services/user-service.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  protected name?: string;
  title = 'Nile';

  constructor(private authService: AuthServiceService, private cookieService: CookieService, private userService: UserServiceService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
     // this.cookieService.deleteAll();
  }
}
