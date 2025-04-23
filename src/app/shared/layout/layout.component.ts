import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../../features/home/login/login.component";
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationComponent} from "../../features/home/registration/registration.component";
import {ForgotPasswordComponent} from "../../features/home/forgot-password/forgot-password.component";
import {Subscription, take} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {EmailVerifyComponent} from "../../features/home/email-verify/email-verify.component";
import {NewPasswordComponent} from "../../features/home/new-password/new-password.component";
import {AuthenticationService} from "../../services/authentication.service";
import {Store} from "@ngrx/store";
import {selectUser} from "../../store/app.selectors";
import {CategoryControllerService} from "../../api/services/category-controller.service";
import {CategoryDto} from "../../api/models/category-dto";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: false
})
export class LayoutComponent implements OnInit, OnDestroy {
  protected routeQueryParams$?: Subscription;
  protected currentUser$ = this.store.select(selectUser);
  protected categoryMenuOpen: boolean = false;
  protected subscription?: Subscription;
  protected categories: CategoryDto[] = [];
  constructor(private store: Store, private dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute,private authenticationService: AuthenticationService,
            private categoryService: CategoryControllerService) {
  }

  ngOnInit(): void {
    this.routeQueryParams$ = this.activatedRoute.queryParams.subscribe(params => {
      const forgotPassword = params['forgotPassword'];
      const confirmEmail = params['emailVerification'];
      if (forgotPassword) {
        this.dialog.open(NewPasswordComponent, {
          data: {userToken: params['userToken']},
          disableClose: true,
        })
      } else if (confirmEmail) {
        this.dialog.open(EmailVerifyComponent, {
          data: {userToken: params['userToken']},
          disableClose: true,
        })
      }
    })
    this.currentUser$.subscribe( user => {})
    this.categoryService.getMainCategories().pipe(take(1)).subscribe(categories => {
      this.categories = categories;
    })
  }

  login() {
    const ref = this.dialog.open(LoginComponent, {
      disableClose: true,
    });
    ref.afterClosed().subscribe(value => {
      if (value === 'register') {
        this.register();
      } else if (value === 'forgot_password') {
        this.forgotPassword();
      } else if (value != false) {
        //this.getCurrentUser();
      }
    })
  }

  register() {
    const ref = this.dialog.open(RegistrationComponent, {
      disableClose: true,
    });
    ref.afterClosed().subscribe(value => {
      if (value === 'login') {
        this.login();
      }
    })
  }

  forgotPassword() {
    const ref = this.dialog.open(ForgotPasswordComponent, {
      disableClose: true,
    });
    ref.afterClosed().subscribe(value => {
      if (value === 'login') {
        this.login();
      }
    })
  }

  logout() {
    this.router.navigateByUrl("/home");
    this.authenticationService.logout();
  }

  categoryMenu() {
    this.categoryMenuOpen = !this.categoryMenuOpen;
  }

  menuClosed() {
    setTimeout(() => {
      this.categoryMenuOpen = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
