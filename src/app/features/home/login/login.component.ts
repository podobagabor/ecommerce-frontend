import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../../api/services/auth-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {UserServiceService} from "../../../api/services/user-service.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {

  protected loginForm = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  })
  protected errorMessage: string = '';

  constructor(private loginService: AuthServiceService, private cookieService: CookieService, private userService: UserServiceService, private dialog: MatDialog, private router: Router, private authenticationService: AuthenticationService) {
  }

  login() {
    this.authenticationService.login(this.loginForm.value.email!, this.loginForm.value.password!).then(_ => {
      this.router.navigateByUrl('/home');
      this.dialog.closeAll();
    }).catch(value => {
      this.errorMessage = value;
    })
  }

  ngOnInit(): void {

  }

}
