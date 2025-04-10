import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {UserDtoDetailed} from "../../../api/models/user-dto-detailed";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: false
})
export class ChangePasswordComponent implements OnInit {
  protected passwordsNotCorrect: boolean = false;
  protected currentUser?: UserDtoDetailed;
  protected authForm = new FormGroup({
    password: new FormControl<string>('', Validators.required),
  })
  protected isAuthorized: boolean = false;
  protected newPasswordForm = new FormGroup({
    password1: new FormControl<string>('', Validators.required),
    password2: new FormControl<string>('', Validators.required),
  })

  constructor(private userService: UserControllerService, private authService: AuthenticationService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.newPasswordForm.valueChanges.subscribe(values => {
      this.passwordsNotCorrect = !!(values.password1 && values.password2 && values.password1 !== values.password2);
    })
  }

  newPassword() {
    //todo

    /*
    this.userService.newPassword({
      body: {
        password: this.newPasswordForm.value.password1!,
        id: this.currentUser?.id!,
      }
    }).subscribe(_ => {
      this.dialog.closeAll();
    })

     */
  }

  authorize() {
    //todo ránézni
    /*
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.authService.login(
        user.email!,
        this.authForm.value.password!
      ).then(value => {
        this.isAuthorized = !!value.accessToken;
      })
    })

     */
  }


  }
