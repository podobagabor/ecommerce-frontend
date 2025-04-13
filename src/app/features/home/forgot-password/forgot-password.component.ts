import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
    email: new FormControl<string>('', Validators.required),
  })
  isEmailUnknown: boolean = false;

  constructor(private userService: UserControllerService) {
  }

  forgotPassword() {
    this.isEmailUnknown = false;
    this.userService.requestPasswordChange({body: this.forgotPasswordForm.value.email!!}).subscribe(value => {
      if(!value.success)
        this.isEmailUnknown = true;
      this.emailSent = true;
    })
  }

}
