import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UserControllerService} from "../../../api/services/user-controller.service";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  standalone: false
})
export class NewPasswordComponent implements OnInit {
  protected passwordsNotCorrect: boolean = false;
  protected userToken?: string;
  protected passwordChanged: boolean = false;
  protected newPasswordForm = new FormGroup({
    password1: new FormControl<string>('', Validators.required),
    password2: new FormControl<string>('', Validators.required),
  })

  constructor(private userService: UserControllerService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any) {
    if (data) {
      this.userToken = data['userToken'];
    }
  }

  ngOnInit(): void {
    this.newPasswordForm.valueChanges.subscribe(values => {
      this.passwordsNotCorrect = !!(values.password1 && values.password2 && values.password1 !== values.password2);
    })
  }


  newPassword() {
    if (this.userToken) {
      this.userService.setNewPassword({
        body: {
          token: this.userToken,
          newPassword: this.newPasswordForm.value.password2!
        }
      }).subscribe(_ => {
        this.dialog.closeAll();
      })
    }
  }
}
