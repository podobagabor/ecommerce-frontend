import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserServiceService} from "../../../api/services/user-service.service";
import {AuthServiceService} from "../../../api/services/auth-service.service";
import {UserResponse} from "../../../api/models/user-response";
import {MatDialog} from "@angular/material/dialog";
import {OrderServiceService} from "../../../api/services/order-service.service";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    standalone: false
})
export class ChangePasswordComponent implements OnInit{
  protected passwordsNotCorrect: boolean = false;
  protected currentUser?: UserResponse;
  protected authForm = new FormGroup({
    password: new FormControl<string>('',Validators.required),
  })
  protected isAuthorized: boolean = false;
  protected newPasswordForm = new FormGroup({
    password1: new FormControl<string>('', Validators.required),
    password2: new FormControl<string>('', Validators.required),
  })
  constructor(private test:OrderServiceService,private userService: UserServiceService, private authService: AuthServiceService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.newPasswordForm.valueChanges.subscribe(values => {
      this.passwordsNotCorrect = !!(values.password1 && values.password2 && values.password1 !== values.password2);
    })
  }
  newPassword() {
    this.userService.newPassword({
      body: {
        password: this.newPasswordForm.value.password1!,
        id: this.currentUser?.id!,
      }
    }).subscribe( _ => {
      this.dialog.closeAll();
    })
  }

  authorize() {
    this.userService.getCurrentUser().subscribe( user => {
      this.currentUser = user;
      this.authService.login({
        body: {
          password: this.authForm.value.password!,
          email: user.email!,
        }
      }).subscribe( value => {
        this.isAuthorized = !!value.accessToken;
      })
    })
  }
}
