import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {catchError, EMPTY, take, tap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: false
})
export class ForgotPasswordComponent {

  protected emailSent: boolean = false;
  protected forgotPasswordForm = new FormGroup({
    email: new FormControl<string>('', Validators.required),
  })
  isEmailUnknown: boolean = false;

  constructor(private userService: UserControllerService, private snackService: MatSnackBar) {
  }

  forgotPassword() {
    if (this.forgotPasswordForm.value.email) {
      this.isEmailUnknown = false;
      this.userService.requestPasswordChange({body: this.forgotPasswordForm.value.email}).pipe(take(1),
        tap(() => this.emailSent = true),
        catchError((err) => {
          console.error(err);
          if (err.status === 404) {
            this.isEmailUnknown = true;
            this.snackService.open("Ismeretlen e-mail cím", undefined, {
              duration: 3000,
            });
          } else {
            this.snackService.open("Hiba történt, töltsd újra az oldalt.", undefined, {
              duration: 3000,
            });
          }
          return EMPTY;
        })
      ).subscribe()
    }
  }
}
