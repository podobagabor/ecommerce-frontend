import {Component, OnDestroy, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthServiceService} from "./services/api/services/auth-service.service";
import {Store} from "@ngrx/store";
import {UserActions} from "./store/user-state/user.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  protected name?: string;
  title = 'Nile';

  constructor(private cookieService: CookieService,private store: Store) {
  }

  ngOnInit(): void {
    console.log("lefut")
    this.store.dispatch(UserActions.init())
  }

  ngOnDestroy(): void {
     this.cookieService.deleteAll();
  }
}
