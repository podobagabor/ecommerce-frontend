import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../../services/api/services/auth-service.service";
import {UserControllerService} from "../../../api/services/user-controller.service";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: false
})
export class ForgotPasswordComponent {

  protected emailSent: boolean = false;
  protected forgotPasswordForm = new FormGroup({
    email: new FormControl<string>('',Validators.required),
  })
  isEmailUnknown: boolean = false;
  constructor(private userService: UserControllerService) {
  }

  forgotPassword() {
    this.isEmailUnknown = false;
    this.userService({body: { email: this.forgotPasswordForm.value.email!}}).subscribe( value => {
      //todo: ez is
      /*if() {
        this.isEmailUnknown = true;
      }*/
      this.emailSent = true;
    })
  }

}
