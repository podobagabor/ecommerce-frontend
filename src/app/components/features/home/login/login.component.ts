import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../core/services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {

  protected loginForm = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  })
  protected errorMessage: string = '';

  constructor(private cookieService: CookieService, private dialog: MatDialog, private router: Router, private authenticationService: AuthenticationService) {
  }

  login() {
    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.cookieService.deleteAll();
      this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).then(_ => {
        this.router.navigateByUrl('/home');
        this.dialog.closeAll();
      }).catch(value => {
        this.errorMessage = value;
      })
    }
  }
}
